import React from 'react';
import styled from "@emotion/styled";
import fastXml from 'fast-xml-parser';
import { spacing, colors, fontSizes, radii } from "../constants";
import { ObservableCell, SessionStore } from "../components";

//Upload page specific css/html
export const UploadButton = styled("div")`
	position: relative;
    padding: ${spacing[0]} ${spacing[0]};
    margin: ${spacing[2]} ${spacing[0]};
    overflow: hidden;
    background-color: ${colors.blue};
    font-size: ${fontSizes[1]};
    border-radius: ${radii[2]};
    color: ${colors.white};
    text-decoration: none;
    display: inline-block;
    width: 300px;
    height: 20px;
    &:hover {
        background-color: ${colors.lightblue};
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

export const AddRow = styled("button")`
  border: 1px solid #dddddd;
`;
//-------------------------------------------------

// Generates earning records table from uploaded XML file, XML parsing adapted from Amrutha
// If user uploads: use Amru's table logic
// If manual entering, use alternative table generation method.
export class GenerateTable extends React.Component {

	render () {
		var header;
		var tableRows;
		if ((this.props.parsedXml) && (this.props.manual === false))  {
			const parsedXml = this.props.parsedXml;
		    const earnings = parsedXml['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'];
		    header = <tr><TableHeader>Year</TableHeader ><TableHeader>Amount</TableHeader></tr>;
		    tableRows = earnings.map((earning, i) => {
		    	return(
		    		<TableRow key={i}>
			    		<td><label>{earning['@_startYear']}</label></td>
			    		<td><input id={earning['@_startYear']} defaultValue={earning['osss:FicaEarnings']} onChange={this.props.handleInputEarnings}></input></td>
			    	</TableRow>
		    	)

		    });
	   } else if (this.props.manual) {
	   	header = <tr><TableHeader>Year</TableHeader ><TableHeader>Amount</TableHeader><td><AddRow onClick={this.props.addTableRow}>+</AddRow></td></tr>;
	   	tableRows = this.props.manualTable.map((tableRow) => {
	   		return(tableRow)
	   	})
	   } else {
	   	header = <tr></tr>;
	   	tableRows = <tr></tr>;
	   };

		return (
			<DisplayTable>
			    <tbody>
			    	{header}
			    	{tableRows}
			    </tbody>
			</DisplayTable>

			)
	}
}

export default class FileUpload extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    this.handleUpload = this.handleUpload.bind(this);
	    this.handleLoadTable = this.handleLoadTable.bind(this);
	    this.handleInputEarnings = this.handleInputEarnings.bind(this);
	    this.handleManualEarnings = this.handleManualEarnings.bind(this);
	    this.handleSave = this.handleSave.bind(this);
	    this.addTableRow = this.addTableRow.bind(this);
	    this.assertLoad = this.assertLoad.bind(this);
	    this.customObserver = this.customObserver.bind(this);
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
	    	rowValues: [],
	    	manualTable: [],
		    displayTable: false,
		    buttonText: this.props.manual ? "Enter Earnings Record" :"Upload Earnings Record",
		    buttonFunction: this.props.manual ? this.handleEnter : this.handleUpload,
		    buttonType: this.props.manual ? "button" : "file"
	    };
	 }

	componentDidUpdate(prevProps, prevState) {
		if (this.state.elementLoaded) {
			this.parseXML.value = this.state.earningsRecord
		}
	 }

	 componentDidMount() {
	 	if (SessionStore.get('earnings')) {
	 		var earningsValue = JSON.parse(SessionStore.get('earnings'))
	 		this.setState({
	 			earningsRecord: earningsValue
	 		})
	 	}
	 	
	 	if (SessionStore.get('tableRows')) {
	 		var tableJSON = JSON.parse(SessionStore.get('tableRows'))
	 		var updateTable = this.state.manualTable
	 		var table = tableJSON.map((row, i) => {
	 			return (
	 				updateTable.push(
	 				<TableRow key={i}>
			    		<td><input type="text" id={'year_' + i} defaultValue={row['year']} onChange={this.handleManualEarnings}></input></td>
			    		<td><input type="text" id={'value_' + i} defaultValue={row['value']} onChange={this.handleManualEarnings}></input></td>
			    	</TableRow>
			    	)
			    )
	 		})
	 		this.setState({
	 			rowValues: tableJSON,
	 			manualTable: updateTable
	 		})
	 	}
	 	
	 }


	 assertLoad() {
	 	this.setState({
	 		elementLoaded: true
	 	})
	 }

	 //Customer Observer for Observable API; Instantiates synced parsedXML object for use throughout component
	 customObserver(test) {
	    return {fulfilled: (value) => {
	        this.parseXML = value
	        this.assertLoad()
	    }}
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
	 handleLoadTable(reader) {
	 	 if (fastXml.validate(reader.target.result) === true) {
				var parsedText = fastXml.parse(reader.target.result, {ignoreAttributes: false})
				var earningsJSON = JSON.stringify(parsedText)
	 	 		SessionStore.push('earnings', earningsJSON)
			 	this.setState({
			 		earningsRecord: parsedText
			 	})
	 	}
	}

	 handleUpload(formResponse) {
	 	this.setState({
	 		displayTable: true
	 	});
	 	formResponse.preventDefault();
	 	const file = this.fileInput.current.files[0]
	 	const name = this.fileInput.current.files[0].name
	 	const formData = new FormData();
		formData.append(name, file)

		var reader = new FileReader()
		reader.readAsText(file);

		reader.onload = (reader) => this.handleLoadTable(reader)	
	 }

	 //Stores users input for manually entered table to allow for persistence across page changes
	 handleManualEarnings(input) {
	 	const [type, key] = input.target.id.split('_')
	 	var rowStore = this.state.rowValues

	 	if (rowStore[key]) {
	 		rowStore[key][type] = input.target.value
	 	} else {
	 		rowStore[key] = {}
	 		rowStore[key][type] = input.target.value
	 	}
	 	
	 	this.setState({
	 		rowValues: rowStore
	 	})
 	 }

 	 //Saves manually entered record to this.state.earningsRecord object, becomes noticable to Observable API
 	 handleSave() {
 	 	var tempRecord = this.state.earningsRecord ? this.state.earningsRecord : this.state.defaultRecord

	 	this.state.rowValues.map((earnings, i) => {
	 		var newrecord = {
		 	 	 '@_startYear': earnings['year'],
		 	 	 '@_endYear': earnings['year'], 
				 'osss:FicaEarnings': earnings['value']
			}

			tempRecord['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'].push(newrecord)
	 	})

	 	var rowsJSON = JSON.stringify(this.state.rowValues)
	 	SessionStore.push('tableRows', rowsJSON)

	 	var earningsJSON = JSON.stringify(tempRecord)
	 	SessionStore.push('earnings', earningsJSON)

	 	this.setState({
	 		earningsRecord: tempRecord
	 	})

 	 }

	 addTableRow() {
	 	var rowkey = this.state.manualTable.length
	 	var newRow = <TableRow key={rowkey}>
			    		<td><input type="text" id={'year_' + rowkey} defaultValue="0" onChange={this.handleManualEarnings}></input></td>
			    		<td><input type="text" id={'value_' + rowkey} defaultValue="0" onChange={this.handleManualEarnings}></input></td>
			    	</TableRow>
		var updateTable = this.state.manualTable
		updateTable.push(newRow)

		this.setState({
			manualTable: updateTable
		})
	 }

	render() {
		return (
			<div className ='upload-form'>
					<UploadButton style={{display: this.props.manual ? 'none' : true}}>
						<UploadLabel htmlFor="inputfile" className="btn">{this.state.buttonText}</UploadLabel>
						<UploadInput type={this.state.buttonType} id='inputfile' ref={this.fileInput} onChange={this.state.buttonFunction}></UploadInput>
					</UploadButton>
					<GenerateTable parsedXml={this.state.earningsRecord} handleInputEarnings={this.handleInputEarnings} manual={this.props.manual} manualTable={this.state.manualTable} addTableRow={this.addTableRow} />
					<UploadButton onClick={this.handleSave} style={{display: this.props.manual ? true : 'none'}}>
						Save
					</UploadButton>
					<div><ObservableCell cellname="mutable parsedXmlFileText" customObserver={this.customObserver}/></div>
        			<div style={{display: 'none'}}><ObservableCell cellname='calculationDisplay' /></div>
			</div>
		)
	}
}