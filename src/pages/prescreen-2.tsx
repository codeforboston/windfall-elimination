import React from "react";
import styled from "@emotion/styled";
import { ButtonLink, ButtonLinkRed, Card, Form, HelperText, Message, QuestionText, SEO, TextBlock, FileUpload, ObservableCell, SessionStore, FontControl } from "../components";

export const SsaImage= styled("img")`
    border: 1px solid #dddddd;
    width: 500px;
`; 

export default class Prescreen2 extends React.Component {
    constructor(props, context) {
        super(props)
        this.handleOption = this.handleOption.bind(this);

        this.state = {
            displayImage: false
        }
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
        return(
            <>
                <SEO title="Prescreen 2" keywords={[`gatsby`, `application`, `react`]} />

                <Message>
                    Based on your answers, you are probably affected by WEP. Please enter your information below.
                </Message>

                <h2>Getting your earnings record</h2>
                <div>To calculate your Social Security retirement benefits, you will need a record of your earnings from Social Security. There are a few ways to get this earnings record:</div>
                <Form>
                    <Card>
                        <QuestionText>Do you have a MySocialSecurity account?</QuestionText>
                        <HelperText>
                            If no: you can easily sign up online at this <a href="https://www.ssa.gov/myaccount/" target="__blank">link</a>. 
                            Your MySocialSecurity account will let you change your address, change your direct deposit, 
                            request an earnings statement or a 1099 form, or apply for a replacement SSA card.

                            If yes: once you are logged in to your MySSA account, download your earnings record as a file (XML or PDF).
                        </HelperText>
                        <label> Yes
                            <input type="radio" name="mySocialSecurityAccount" value="true" onChange={this.handleOption} checked={this.state.displayImage === 'true' ? true : false }></input>
                        </label>
                        <label> No
                            <input type="radio" name="mySocialSecurityAccount" value="false" onChange={this.handleOption} checked={this.state.displayImage === 'false' ? true : false}></input>
                        </label>
                    </Card>
                </Form>
                <div style={{display: this.state.displayImage === "true" ? true : 'none'}}><SsaImage src='https://user-images.githubusercontent.com/50156013/56998273-bcd78800-6b78-11e9-86b5-9db06d292a4c.jpg'></SsaImage></div>
                {this.state.displayImage === false ? 
                    <div></div> 
                    :
                    this.state.displayImage === "true" ?
                        <div>
                            <TextBlock>
                                Once you have a copy of your earnings record, upload the XML or PDF below.
                            </TextBlock>
                            <FileUpload manual={false}/>
                            <TextBlock>
                                   Once you have uploaded your earnings record, click "Submit".
                            </TextBlock>
                        </div>
                        :
                        <div>
                            <TextBlock>
                                If no: Write to the SSA to request that a copy of your earnings record be mailed to you:
                    The SSA will send you a free copy of your earnings record. To request the earnings record, print and complete this form and mail it to the address listed.
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
                <ButtonLinkRed to="/prescreen-1c/">Go back!</ButtonLinkRed>
                <ButtonLink to="/screen-1/">Submit</ButtonLink>
            </>

            )
    }
}
