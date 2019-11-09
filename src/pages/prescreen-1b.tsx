import React from "react";
import styled from "@emotion/styled";
import { colors } from "../constants";
import {
  Card,
  H2,
  QuestionText,
  SEO,
  TextBlock,
  FileUpload,
  RadioButton,
  LabelText,
  AnswerBox,
  Glossary, 
  WarningBox
} from "../components";
import { SessionStore } from "../library/session-store";
import { FontControl } from "../library/font-control";

export const SsaImage= styled("img")`
  border: 1px solid #dddddd;
  width: 500px;
  margin-top: 25px;
`;

const HowToContainer = styled.div`
  display: block;
`;


const ContentContainer = styled.div`
  max-width: 70%;
`;

enum EarningsEnum {
	XML = "XML",
	PDF = "PDF",
	PDFPRINT = "PDFPRINT",
	PAPER = "PAPER"
}

export default class Prescreen1b extends React.Component {
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);
    this.showFileUpload = this.showFileUpload.bind(this);
    this.showManualTable = this.showManualTable.bind(this);
    this.state = {
      haveEarnings: null,
      earningsFormat: null,
      haveSSAccount: null,
    };
  }

   componentDidMount() {
        this.setState({
          haveEarnings: SessionStore.get('haveEarnings'),
          earningsFormat: SessionStore.get('earningsFormat'),
          haveSSAccount: SessionStore.get('haveSSAccount')
        })
    }

    componentDidUpdate() {
        FontControl.loadFont()
    }

    handleOption(e) {
    
        SessionStore.push(e.target.name, e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    showFileUpload() {
      return (this.state.haveEarnings === 'false' && this.state.haveSSAccount === 'true') ||
      (this.state.haveEarnings === 'true' && (this.state.earningsFormat === EarningsEnum.XML || this.state.earningsFormat === EarningsEnum.PDF))
    }

    showManualTable() {
      return (this.state.haveEarnings === 'true' && (this.state.earningsFormat === EarningsEnum.PDFPRINT || this.state.earningsFormat === EarningsEnum.PAPER))
    }

  render() {
    return (
    <React.Fragment>
        <SEO title="Prescreen 1b" keywords={[`social security`, `government`, `retirement`]} />
        <ContentContainer>
            <H2>Step 2: Earnings</H2>
            <TextBlock>
                Your Social Security retirement benefits are calculated based on your earnings in covered employment.
            </TextBlock>
            <br/>
            <TextBlock>
                To calculate your Social Security retirement benefits, you will need a record of your earnings from Social Security.
                Follow the steps below to get your earning record.
            </TextBlock> 
                
                <Card>
                    <QuestionText>Do you have a copy of your earnings record?</QuestionText>
                    <AnswerBox>
                    <RadioButton type="radio" name="haveEarnings" value="true" onChange={this.handleOption} checked={this.state.haveEarnings === 'true' } />
                    <LabelText>Yes</LabelText> 
                    </AnswerBox>
                    <AnswerBox>
                    <RadioButton type="radio" name="haveEarnings" value="false" onChange={this.handleOption} checked={this.state.haveEarnings === 'false' } />
                    <LabelText>No</LabelText>
                    </AnswerBox>
                </Card>

            {this.state.haveEarnings === 'true' ?
              <Card>
                <QuestionText>What format is the copy of your earnings record?</QuestionText>
                <AnswerBox>
                  <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.XML} onChange={this.handleOption} checked={this.state.earningsFormat === EarningsEnum.XML} />
                  <LabelText>XML file (MySocialSecurity)</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PDF} onChange={this.handleOption} checked={this.state.earningsFormat === EarningsEnum.PDF} />
                  <LabelText>PDF (MySocialSecurity)</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PDFPRINT} onChange={this.handleOption} checked={this.state.earningsFormat === EarningsEnum.PDFPRINT} />
                  <LabelText>PDF (scanned from print)</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PAPER} onChange={this.handleOption} checked={this.state.earningsFormat === EarningsEnum.PAPER} />
                  <LabelText>Paper (mailed from SSA)</LabelText>
                </AnswerBox>
              </Card> : null
            }

            {this.state.haveEarnings === 'false' ?
              <Card>
                <QuestionText>Do you have a MySocialSecurity account?</QuestionText>
                <AnswerBox>
                  <RadioButton type="radio" name="haveSSAccount" value="true" onChange={this.handleOption} checked={this.state.haveSSAccount === 'true'} />
                  <LabelText>Yes</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="haveSSAccount" value="false" onChange={this.handleOption} checked={this.state.haveSSAccount === 'false'} />
                  <LabelText>No</LabelText>
                </AnswerBox>
              </Card> : null
            }

                {this.state.haveEarnings === 'false' && this.state.haveSSAccount === 'true' ?
                  (
                    <HowToContainer>
                    <Card>
                      <H2>
                        HOW-TO
                      </H2>
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
                    </HowToContainer>
                  ):null
                }

          {this.showFileUpload() ?
            <HowToContainer>
              <Card>
                <TextBlock>
                  Please upload your earnings record file
                  </TextBlock>
                <FileUpload manual={false} />
                <TextBlock>
                  Once you have uploaded your earnings record, click "Submit".
                  </TextBlock>
              </Card>
            </HowToContainer> : null
          }

          {this.showManualTable() ?
            <Card>
              <TextBlock>
                Please enter the “Taxed Social Security Earnings” amounts from your earnings record.
              </TextBlock>
              <FileUpload manual={true} />
            </Card> : null     
          }

          {this.state.haveEarnings === 'false' && this.state.haveSSAccount === 'false' ?
            <>
              <Card>
                <TextBlock>
                  We cannot estimate your WEP without a copy of your earnings record.
                  The How-to’s below will tell you how to get your earnings record through the mail, or by signing up for a MySocialSecurity account online.
                  </TextBlock>
              </Card>
              <HowToContainer>
                <Card>
                  <H2>HOW-TO</H2>
                  <h3>Request a copy of your earnings report through the mail</h3>
                  <TextBlock>
                    We cannot estimate your WEP without a copy of your earnings record.
                    The How-to’s below will tell you how to get your earnings record through the mail, or by signing up for a MySocialSecurity account online.
                  </TextBlock>
                </Card>
              </HowToContainer>
              <HowToContainer>
                <Card>
                  <H2>HOW-TO</H2>
                  <h3>Sign up for an online account at MySocialSecurity</h3>
                  <TextBlock>
                    [Instructions for how to do this go here]
                  </TextBlock>
                </Card>
              </HowToContainer>
            </> : null
          }
          </ContentContainer>
          <Glossary 
          title="MYSOCIALSECURITY"
          link="https://www.ssa.gov/myaccount/"
          linkText="Sign up online for a MySocialSecurity using this link."
          >
          MySocialSecurity is the Social Security Administrations online service. With a MySocialSecurity account , you can download a copy of your earnings record to use for this question.
          </Glossary>
      </React.Fragment>
    )
  }
}
