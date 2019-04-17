import React from 'react';
import styled from "@emotion/styled";
import { spacing, colors, fontSizes, radii } from "../constants";

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

export default class FileUpload extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    this.handleHide = this.handleHide.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleText = this.handleText.bind(this);
	    this.fileInput = React.createRef();

	    this.state = {
	      show: true,
	      redirect: false,
	      submitState: false,
	      matrixType:'None',
	      directoryReq: "false",
	      setName: ''
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

	 handleSubmit(formResponse) {
	 	formResponse.preventDefault();
	 	const file = this.fileInput.current.files[0]
	 	const name = this.fileInput.current.files[0].name
	 	const formData = new FormData();
		formData.append(name, file)
		console.log(formData.get(this.fileInput.current.files[0].name))	
	 }

	render() {
		return (
			<div class='upload-form'>
					<UploadButton>
						<UploadLabel htmlFor="inputfile" class="btn">Upload Earnings Record PDF</UploadLabel>
						<UploadInput type='file' id='inputfile' ref={this.fileInput} onChange={this.handleSubmit}></UploadInput>
					</UploadButton>
			</div>
		)
	}
}