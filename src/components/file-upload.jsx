import React from 'react';
import styled from "@emotion/styled";
import fastXml from 'fast-xml-parser';
import { spacing, colors, fontSizes, radii } from "../constants";

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
//-------------------------------------------------

// Generates earning records table from uploaded XML file, XML parsing adapted from Amrutha
export class GenerateTable extends React.Component {
	componentDidMount() {

	}

	render () {
		var header;
		var tableRows;
		if (this.props.parsedXml) {
			const parsedXml = this.props.parsedXml;
		    const earnings = parsedXml['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'];
		    header = <tr><TableHeader>Year</TableHeader ><TableHeader>Amount</TableHeader ></tr>;
		    tableRows = earnings.map((earning, i) => {
		    	return(
		    		<TableRow key={i}>
			    		<td><label>{earning['@_startYear']}</label></td>
			    		<td><label>{earning['osss:FicaEarnings']}</label></td>
			    	</TableRow>
		    		)
			});

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

	    this.handleHide = this.handleHide.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleText = this.handleText.bind(this);
	    this.handleLoadTable = this.handleLoadTable.bind(this);
	    this.fileInput = React.createRef();

	    this.state = {
	      earningsRecord: ''
	    };
	 }



	 handleHide() {
	    this.setState({ show: false });
	    this.setState({redirect: true});
	 }

	 handleText(name) {
	 	this.setState({
	 		setName: name.target.value
	 	});
	 }

	 handleLoadTable(reader) {
	 	 if (fastXml.validate(reader.target.result) === true) {
				var parsedText = fastXml.parse(reader.target.result, {ignoreAttributes: false})
	 	this.setState({
	 		earningsRecord: parsedText
	 	});
	 	}
	}

	 handleSubmit(formResponse) {
	 	formResponse.preventDefault();
	 	const file = this.fileInput.current.files[0]
	 	const name = this.fileInput.current.files[0].name
	 	const formData = new FormData();
		formData.append(name, file)


		var reader = new FileReader()
		reader.readAsText(file);

		reader.onload = (reader) => this.handleLoadTable(reader)	
	 }

	render() {

		return (
			<div className ='upload-form'>
					<UploadButton>
						<UploadLabel htmlFor="inputfile" className="btn">Upload Earnings Record</UploadLabel>
						<UploadInput type='file' id='inputfile' ref={this.fileInput} onChange={this.handleSubmit}></UploadInput>
					</UploadButton>
					<GenerateTable parsedXml = {this.state.earningsRecord}/>

			</div>
		)
	}
}