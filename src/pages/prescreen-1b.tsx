import React from "react";
import styled from "@emotion/styled";
import { colors } from "../constants";
import {
  ButtonLinkGreen,
  ButtonLink,
  Card,
  HelperText,
  QuestionText,
  SEO,
  TextBlock,
  FileUpload,
  RadioButton,
  AnswerBox
} from "../components";
import { SessionStore } from "../library/session-store";
import { FontControl } from "../library/font-control";

export const SsaImage= styled("img")`
  border: 1px solid #dddddd;
  width: 500px;
  margin-top: 25px;
`;

const Label = styled.label`
  font-size: 30px;
`;

const HowToContainer = styled.div`
  display: block;
`;

const WarningBox = styled.div`
  border-left: 3px solid ${colors.red};
  background-color: #ffe6e6;
  padding: 10px;
`;

export default class Prescreen1b extends React.Component {
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);

    this.state = {
      isLoaded: false,
      displayImage: false
    };
  }

   componentDidMount() {
        if (!this.state.isLoaded) {
            this.setState({
              isLoaded: true,
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
          isLoaded: true,
          displayImage: e.target.value
        })
    }

  render() {
    return (
      <>
        <SEO title="Prescreen 1b" keywords={[`social security`, `government`, `retirement`]} />
            <h2>Step 2: Getting your earnings record</h2>
            <TextBlock>
                Your Social Security retirement benefits are calculated based on your earnings in covered employment.
            </TextBlock>
            <TextBlock>
                To calculate your Social Security retirement benefits, you will need a record of your earnings from Social Security.
                Follow the steps below to get your earning record.
            </TextBlock> 
                
                <Card>
                    <QuestionText>Do you have a copy of your earnings record?</QuestionText>
                    <AnswerBox>
                    <RadioButton type="radio" name="mySocialSecurityAccount" value="true" onChange={this.handleOption} checked={this.state.displayImage === 'true' ? true : false } />
                    <Label>Yes</Label> 
                    </AnswerBox>
                    <AnswerBox>
                    <RadioButton type="radio" name="mySocialSecurityAccount" value="false" onChange={this.handleOption} checked={this.state.displayImage === 'false' ? true : false} />
                        <Label> 
                        No
                    </Label>
                    </AnswerBox>
                </Card>
              
                
                {this.state.displayImage === false ?
                  (<Card>
                      <div>Further instructions will be given based on your answer.</div>
                  </Card>)
                    :
                    (<HowToContainer>
                    <Card>
                      <h2>
                        HOW-TO
                      </h2>
                        <h3>Download your earnings record from MySocialSecurity</h3>
                        <WarningBox>
                        This how-to will show you how to download your personal Social Security information. Only follow these steps if you are using a private computer.
If you only have access to a public computer - like those at a library, school, or computer lab - please click here to be shown instructions for requesting a physical copy of your earnings record in the mail.
                        </WarningBox>
                        <ul>
                        <ol>1) Log in to your MySocialSecurity account</ol>
<ol>2) Click on “Download Your Statement Data”, as seen in
the red box in the photo below.</ol>
                      <SsaImage 
                            src='https://user-images.githubusercontent.com/50156013/56998273-bcd78800-6b78-11e9-86b5-9db06d292a4c.jpg' 
                      />
                      <ol>3) Save the XML file to your computer.</ol>
<ol>4) Upload the XML file using the tool below.</ol>
</ul>
                    </Card>
                  <Card>
                      <TextBlock>
                        Please upload your earnings record file
                      </TextBlock>
                      <FileUpload manual={false}/>
                      <TextBlock>
                        Once you have uploaded your earnings record, click "Submit".
                      </TextBlock>
                  </Card>
                  </HowToContainer>)
                    
                }
          <ButtonLinkGreen to="/prescreen-1a/">Go back!</ButtonLinkGreen>
          <ButtonLink to="/prescreen-1c/">Submit</ButtonLink>
      </>
    )
  }
}
