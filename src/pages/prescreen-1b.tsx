import React from "react";
import styled from "@emotion/styled";
import {
  ButtonLink,
  ButtonLinkRed,
  Card,
  Form,
  HelperText,
  Message,
  QuestionText,
  SEO,
  TextBlock,
  FileUpload,
  ObservableCell
} from "../components";
import { SessionStore } from "../library/session-store";
import { FontControl } from "../library/font-control";

export const SsaImage= styled("img")`
    border: 1px solid #dddddd;
    width: 500px;
`;

export default class Prescreen1b extends React.Component {
  constructor(props, context) {
    super(props);
    this.handleOption = this.handleOption.bind(this);

    this.state = {
      displayImage: false
    };
  }

   componentDidMount() {
        if (SessionStore.get('displayImage')) {
            this.setState({
                displayImage: SessionStore.get('displayImage')
            })
        }
    }

    componentDidUpdate() {
        FontControl.loadFont()
    }

    handleOption(e) {
        SessionStore.push("displayImage", e.target.value)
        this.setState({
            displayImage: e.target.value
        })
    }

  render() {
    return (
      <>
        <SEO
          title="Prescreen 1b"
          keywords={[`gatsby`, `application`, `react`]}
        />
                <h2>Step 2: Getting your earnings record</h2>
                <TextBlock>
                Your Social Security retirement benefits are calculated based on your earnings in covered employment.
              </TextBlock>
              <TextBlock>
                To calculate your Social Security retirement benefits, you will need a record of your earnings from Social Security.
                Follow the steps below to get your earning record.
              </TextBlock> 
                <Form>
                    <Card>
                        <QuestionText>Do you have a MySocialSecurity account?</QuestionText>
                        <HelperText>
                            Your MySocialSecurity account will let you download a copy of your earnings record. You can sign up online at this <a href="https://www.ssa.gov/myaccount/" target="__blank">link</a>.
                        </HelperText>
                        <label> Yes
                            <input type="radio" name="mySocialSecurityAccount" value="true" onChange={this.handleOption} checked={this.state.displayImage === 'true' ? true : false }></input>
                        </label>
                        <label> No
                            <input type="radio" name="mySocialSecurityAccount" value="false" onChange={this.handleOption} checked={this.state.displayImage === 'false' ? true : false}></input>
                        </label>
                    </Card>
                </Form>
                <Card>
                <div style={{display: this.state.displayImage === "true" ? true : 'none'}}>To download your earnings record, click on “Download Your Statement Data” in the red box in the photo below. Save the XML file somewhere you can easily access it.</div>
                <div style={{display: this.state.displayImage === "true" ? true : 'none'}}><SsaImage src='https://user-images.githubusercontent.com/50156013/56998273-bcd78800-6b78-11e9-86b5-9db06d292a4c.jpg'></SsaImage></div>
                {this.state.displayImage === false ?
                    <div>Further instructions will be given based on your answer.</div>
                    :
                    this.state.displayImage === "true" ?
                        <div>
                            <TextBlock>
                                Upload the XML or PDF below.
                            </TextBlock>
                            <FileUpload manual={false}/>
                            <TextBlock>
                                   Once you have uploaded your earnings record, click "Submit".
                            </TextBlock>
                        </div>
                        :
                        <div>
                            <TextBlock>
                                To request a copy of your earnings record from the Social Security Administration, please complete the form at this <a href="https://www.ssa.gov/myaccount/materials/pdfs/SSA-7004.pdf">link</a> and mail it to the address on the form. You should receive your earnings record in 4-6 weeks.

                                Once you have a copy of your form, you can scan and upload it, or enter your earnings manually in the table below.
                            </TextBlock>
                            <TextBlock>
                                Once you have a copy of your earnings record, you can manually enter the values below.
                            </TextBlock>
                            <FileUpload manual={true} />
                            <TextBlock>
                                   Once you have entered your earnings record, click "Submit".
                            </TextBlock>
                        </div>
                }
              </Card>
                <ButtonLinkRed to="/prescreen-1a/">Go back!</ButtonLinkRed>
                <ButtonLink to="/prescreen-1c/">Submit</ButtonLink>
            </>

            )
    }
}
