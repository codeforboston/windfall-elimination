import React from 'react';
import styled from "@emotion/styled";
import fastXml from "fast-xml-parser";
import pdfJS from "pdfjs-dist";
import { spacing, colors, fontSizes, radii } from "../constants";
import { ObservableCell } from "../components";
import { SessionStore } from "../library/session-store";

//Upload page specific css/html
export const UploadButton = styled("div")`
	position: relative;
	padding: 25px 0 0 0;
    margin: ${spacing[2]} ${spacing[0]};
    overflow: hidden;
    background-color: ${colors.white};
    font-size: ${fontSizes[1]};
	border-radius: 25px;
	border: 2px solid ${colors.black};
    color: ${colors.purple};
    text-decoration: none;
	display: block;
	text-align: center;
    width: 300px;
    &:hover {
        background-color: ${colors.lightBlue};
    }
`;

export const UploadInput = styled("input")`
	visibility: hidden;
	position: relative;
  	width: 300px;
  	height: 50px;
  	z-index: 1;
`;

export const UploadLabel = styled("label")`
	position: absolute;
	font-size: ${fontSizes[1]};
	width: 300px;
  	height: 50px;
`;

export const DisplayTable = styled("table")`
    border-radius: ${radii[0]};
    margin: ${spacing[0]};
    padding: 8px;
    max-width: 500px;
  	margin: auto;
`;

export const TableHeader = styled("th")`
	background-color: #dddddd;
	border: 1px solid #dddddd;
  	text-align: left;
  	padding: 8px;
`;

export const TableRow= styled("tr")`
	border: 1px solid #dddddd;
`;
//-------------------------------------------------

// Generates earning records table from uploaded XML file, XML parsing adapted from Amrutha
// If user uploads: use Amru's table logic
// If manual entering, use alternative table generation method.
export class GenerateTable extends React.Component {
	constructor(props, context) {
		super(props, context)

		this.alignColumns = this.alignColumns.bind(this)
	}

	alignColumns(tableRows, columnLength){
		var sizedRows = []

	    while (tableRows.length > 0)
	      if (tableRows.length > columnLength) {
	        sizedRows.push(tableRows.splice(0, columnLength))
	      } else {
	        var remLength = columnLength - tableRows.length
	        var smallArr = tableRows.splice(0, tableRows.length)
	        for (var i=0; i < remLength; i++) {
	          smallArr.push(<React.Fragment key={"Filler" + i}></React.Fragment>)
	        }
	        sizedRows.push(smallArr)
	        
	      }

	    var finalRows = sizedRows[0].map(function(record, index) {
	    	var restofArray = sizedRows.slice(1, sizedRows.length)
	      	var len = restofArray.length
	      	var finalRecord = []
	      	finalRecord.push(record)

	      	for (var i=0; i < len; i++) {
	        	finalRecord.push(restofArray[i][index])
	     	};

	      	var completeRow = <TableRow key={"row"+index}>{finalRecord}</TableRow>

	      	return completeRow
	    });

	    return finalRows
	}

	render () {
		var tableRows;
		var finalRows;
		var tablesize = 10;
		var columnLength;
		var earningsSize;
		if ((this.props.parsedXml) && (this.props.manual === false))  {
			const parsedXml = this.props.parsedXml;
		    var earnings = parsedXml['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'];
		    tableRows = earnings.map((earning, i) => {
		    	return(
		    		<React.Fragment key={"earning" + i}>
			    		<td><label>{earning['@_startYear']}</label></td>
			    		<td><input id={earning['@_startYear']} defaultValue={earning['osss:FicaEarnings']} onChange={this.props.handleInputEarnings}></input></td>
			    	</React.Fragment>
		    	)
		    })
		    earningsSize = tableRows.length;
		   	if (earningsSize / 10 > 5) {
		   		columnLength = 20
		      	tablesize = Math.ceil(earnings.length / columnLength)
		    } else {
		    	columnLength = 15
		    	tablesize = Math.ceil(earnings.length / columnLength)
		    }
		    this.headers = Array(tablesize).fill(null).map((header, index) => {
		        return(
		          <React.Fragment key={"header" + index}>
		            <TableHeader>Year</TableHeader ><TableHeader>Amount</TableHeader>
		          </React.Fragment>
		          )
		      })
	   	} else if (this.props.manual) {
		   	tableRows = this.props.manualTable.map((record, key) => {
			    	return(
			    		<React.Fragment key={"earning" + key}>
				    		<td><label>{record['year']}</label></td>
				    		<td>
				    		<input 
				    			type="text" 
				    			id={'value_' + record['year'] +'_' + key}
				    			defaultValue={record['value']} 
				    			onChange={this.props.handleManualEarnings} 
				    			onBlur={this.props.handleSave}
									tabindex={parseInt(key, 10) + 1}
									>
				    		</input>
				    		</td>
				    	</React.Fragment>
			    	)

			    })
		   	earningsSize = tableRows.length;
		   	if (earningsSize / 10 > 5) {
		      	columnLength = 20
		      	tablesize = Math.ceil(this.props.manualTable.length / columnLength)
		    } else {
		    	columnLength = 15
		    	tablesize = Math.ceil(this.props.manualTable.length / columnLength)
		    }

		    this.headers = Array(tablesize).fill(null).map((header, index) => {
		        return(
		          <React.Fragment key={"header" + index}>
		            <TableHeader>Year</TableHeader ><TableHeader>Amount</TableHeader>
		          </React.Fragment>
		          )
		      })

		} else {
			this.header = <tr></tr>;
		   	tableRows = <tr></tr>;
		};

		if (tableRows.length > 0) {
			finalRows = this.alignColumns(tableRows, columnLength)
		} else {
			finalRows = tableRows
		}
	  	
		return (
			<DisplayTable>
			    <tbody>
			    	<tr>{this.headers}</tr>
			    	{finalRows}
			    </tbody>
			</DisplayTable>
		)
	}
}

export default class FileUpload extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    //Make sure that the worker version matches package.json pdfjs-dist version.
	    pdfJS.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/build/pdf.worker.js';

	    this.handleUpload = this.handleUpload.bind(this);
	    this.handleXMLFile = this.handleXMLFile.bind(this);
	    this.handlePDFFile = this.handlePDFFile.bind(this);
	    this.handleInputEarnings = this.handleInputEarnings.bind(this);
	    this.handleManualEarnings = this.handleManualEarnings.bind(this);
	    this.handleSave = this.handleSave.bind(this);
	    this.fileInput = React.createRef();

	    this.state = {
	    	elementLoaded: false,
	    	earningsRecord: undefined,
	    	defaultRecord: {
	    		'osss:OnlineSocialSecurityStatementData': {
	    			'osss:EarningsRecord': {
	    				'osss:Earnings': []
	    			}
	    	}},
	    	userBirthDate: undefined,
	    	userRetireDate: undefined,
	    	estimatedYears: [],
	    	rowValues: [],
	    	manualTable: [],
		    displayTable: false,
		    buttonText: this.props.manual ? "Enter Earnings Record" :"Upload Earnings Record",
		    buttonFunction: this.props.manual ? this.handleEnter : this.handleUpload,
		    buttonType: this.props.manual ? "button" : "file",
		    saveDisable: false
	    };
	 }

	componentDidUpdate(prevProps, prevState) {
	 }

	 componentDidMount() {
	 	if (SessionStore.get('earnings')) {
	 		var earningsValue = JSON.parse(SessionStore.get('earnings'))
	 		this.setState({
	 			earningsRecord: earningsValue
	 		})
	 	}

	 	if (SessionStore.get('BirthDate') && SessionStore.get('RetireDate')){
	 		var birthdate = new Date(JSON.parse(SessionStore.get('BirthDate'))).getFullYear() + 18

	 		var retiredate = new Date(JSON.parse(SessionStore.get('RetireDate'))).getFullYear()

	 		this.setState({
	 			userBirthDate: birthdate,
	 			userRetireDate: retiredate
	 		})
	 	}

		var tempTable = [];
		var yearToRecord = {};

	 	if (SessionStore.get('tableArray')) {
			var tableArray = JSON.parse(SessionStore.get('tableArray'));
			tableArray.forEach(function(record) {
				yearToRecord[record.year] = record;
			});
		}

		if ((birthdate !== undefined) && (retiredate !== undefined )) {
			for (var i = birthdate; i <= retiredate; i++) {
				if (i in yearToRecord) {
					var record = yearToRecord[i];
				} else {
					record = {};
					record['year'] = i;
					record['value'] = 0;
				}
				tempTable.push(record);
		   }
		}

		this.setState({
			manualTable: tempTable
		})
		 
	 }


	//For uploaded records: handles the updating of stored earnings record to match inputed value
 	 handleInputEarnings(input) {
 	 	var modifiedEarnings = this.state.earningsRecord
 	 	var earnings = modifiedEarnings['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings']
 	 	var modifiedyear = input.target.id

 	 	var findValue = earnings.find((element) => {
 	 		if (element['@_startYear'] === modifiedyear) {
 	 			element['osss:FicaEarnings'] = input.target.value
 	 			return true
			  } else {
				return false
			  }
 	 	})

 	 	if (findValue) {
 	 		modifiedEarnings['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'] = earnings

 	 		var earningsJSON = JSON.stringify(modifiedEarnings)
	 	 	SessionStore.push('earnings', earningsJSON)

	 	 	this.setState({
	 	 		earningsRecord: modifiedEarnings
	 	 	})
 	 	}

 	 }

 	 //Parse XML file
	 handleXMLFile(reader) {
	 	 if (fastXml.validate(reader.target.result) === true) {
				var parsedText = fastXml.parse(reader.target.result, {ignoreAttributes: false})
				var earningsJSON = JSON.stringify(parsedText)
	 	 		SessionStore.push('earnings', earningsJSON)
			 	this.setState({
			 		earningsRecord: parsedText
			 	})
	 	}
	}

	//Parse PDF file
	async handlePDFFile(reader) {
	 	//Returns first page of document
	 	var combinedValues = []
		await pdfJS.getDocument(reader.target.result).promise
		.then(async ssaDoc => {
			var earningsPage;
			for (var page of Array(ssaDoc.numPages).keys()) {
				var docPage = ssaDoc.getPage(page + 1)
				await Promise.resolve(docPage)
				.then(pageContent => pageContent.getTextContent())
				.then(doc => {
					var textheader = doc.items.slice(0,10)
					for (var text of textheader) {
						var textstr = text.str.replace(/ /g, "")
						if (textstr === "YourEarningsRecord") {
							earningsPage = doc
							return
						}
					}
				})
			}

			earningsPage.items.forEach((item) => {
				var filter = Number(item.str.replace(",", "").replace(" ",""))
				if (!(Number.isNaN(filter))) {
					combinedValues.push(filter)
				}
			})
		})

		var tempRecord = this.state.defaultRecord
		do {
			var newvalue = combinedValues.shift()
			if (newvalue > 1900) {
				var currentRecord =  tempRecord['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings']
				var newrecord = {
		 	 	 '@_startYear': newvalue,
		 	 	 '@_endYear': newvalue,
				 'osss:FicaEarnings': combinedValues.shift(),
				 'osss:MedicafreEarnings': combinedValues.shift()
				}				
				currentRecord.push(newrecord)
			}
		} while (combinedValues.length > 0)
			
		var earningsJSON = JSON.stringify(this.state.defaultRecord)
		SessionStore.push('earnings', earningsJSON)
		this.setState({
			earningsRecord: this.state.defaultRecord
		})
	}

	handleUpload(formResponse) {
	 	this.setState({
	 		displayTable: true
	 	});
	 	formResponse.preventDefault();
	 	const file = this.fileInput.current.files[0]
	 	var name = this.fileInput.current.files[0].name
		name = name.split('.')
	 	const extension = name[name.length - 1]
		var reader = new FileReader()

		switch (extension) {
			case 'xml':
				reader.onload = (reader) => this.handleXMLFile(reader)
				reader.readAsText(file);
				break;
			
			case 'pdf':
				reader.onload = (reader) => this.handlePDFFile(reader)
				reader.readAsArrayBuffer(file)
				break;

			default:
				alert("I'm sorry, that file was not recognized.")
				break;
		}	
	 }

	 //Stores users input for manually entered table to allow for persistence across page changes
	 handleManualEarnings(input) {
		// eslint-disable-next-line
	 	const [type, year, key] = input.target.id.split('_')

	 	var tempManualTable = this.state.manualTable

	 	if (tempManualTable[key]) {
	 		tempManualTable[key]['value'] = input.target.value
	 	}

	 	this.setState({
	 		manualTable: tempManualTable
	 	})
 	 }

 	 //Saves manually entered record to this.state.earningsRecord object, becomes noticable to Observable API
 	 handleSave() {
 	 	//Load earnings record; if not present, set default record.
 	 	var tempRecord = this.state.earningsRecord ?
 	 	this.state.earningsRecord['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'].length === this.state.manualTable.length
 	 	? this.state.earningsRecord : this.state.defaultRecord
 	 	:
 	 	this.state.defaultRecord

 	 	//Update global earnings record with the manually inputed values
	 	this.state.manualTable.forEach((record, i) => {
	 		var currentRecord = tempRecord['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings']
	 		var newrecord = {
		 	 	 '@_startYear': record['year'],
		 	 	 '@_endYear': record['year'],
				 'osss:FicaEarnings': record['value']
			}

			if (!currentRecord[i]) {
				currentRecord.push(newrecord)
			} else {
				currentRecord[i] = newrecord
			}

	 	})

	 	//Store earnings record and updated table
	 	var arrayJSON = JSON.stringify(this.state.manualTable)
	 	SessionStore.push('tableArray', arrayJSON)

	 	var earningsJSON = JSON.stringify(tempRecord)
	 	SessionStore.push('earnings', earningsJSON)

	 	this.setState({
	 		earningsRecord: tempRecord
	 	})

	 	//Display autosave message, 3 second timeout
	 	var savediv = document.getElementById('AutoSave')
	 	savediv.style.display = 'grid'
        setTimeout(function(){
           savediv.style.display = 'none';
        }, 3000)

 	 }

	render() {
		return (
			<div className ='upload-form'>
					<UploadButton style={{display: this.props.manual ? 'none' : true}}>
						<UploadLabel htmlFor="inputfile" className="btn">{this.state.buttonText}</UploadLabel>
						<UploadInput type={this.state.buttonType} id='inputfile' ref={this.fileInput} onChange={this.state.buttonFunction}></UploadInput>
					</UploadButton>
					<GenerateTable
						parsedXml={this.state.earningsRecord}
						handleInputEarnings={this.handleInputEarnings}
						manual={this.props.manual}
						manualTable={this.state.manualTable}
						handleManualEarnings={this.handleManualEarnings}
						handleSave={this.handleSave}
					/>
					<div id='AutoSave' style={{display:"none"}}>Record has been saved.</div>
			</div>
		)
	}
}
