import React from "react";
import styled from "@emotion/styled";
import { fontSizes } from '../constants'
import {
  Card,
  H2,
  H3,
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
import { UserState, EarningsEnum, useUserState } from '../library/user-state-context';
import { UserStateActions, useUserStateActions } from '../library/user-state-actions-context';

export const SsaImage = styled("img")`
  border: 1px solid #dddddd;
  width: 500px;
  margin-top: 25px;
`;

const GlosaryStyle = styled.div`
     display: block;
     .css-1y9a2pj-GlossaryContainer.ezroa000::nth-of-type(2) {
      position: absolute;
      top: 860px;     
  }
`;

const HowToContainer = styled.div`
  display: block;
`;


const ContentContainer = styled.div`
  width: 70%;
  @media (max-width: 767px){
    width: 100%;
  }
`;

const Link = styled.a`
  color: black;
  font-weight: 600;
  overflow-wrap: break-word;
`;


interface Prescreen1bProps {
  userState: UserState
  userStateActions: UserStateActions
}

class Prescreen1b extends React.Component<Prescreen1bProps> {
  constructor(props: Prescreen1bProps) {
    super(props);
    this.showFileUpload = this.showFileUpload.bind(this);
    this.showManualTable = this.showManualTable.bind(this);
  }

  showFileUpload() {
    const { userState: { haveEarnings, haveSSAAccount, earningsFormat } } = this.props
    return (
      (haveEarnings === false && haveSSAAccount === true) ||
      (haveEarnings === true && (earningsFormat === EarningsEnum.XML || earningsFormat === EarningsEnum.PDF))
    )
  }

  showManualTable() {
    const { userState: { haveEarnings, earningsFormat } } = this.props
    return (haveEarnings === true && (earningsFormat === EarningsEnum.PDFPRINT || earningsFormat === EarningsEnum.PAPER))
  }

  checkForBirthday = () => {
    const { userState: { birthDate } } = this.props
    if (birthDate === null) {
      return <WarningBox><label>Please go back and fill out appropriate birthdate before going forward. </label></WarningBox>
    }

    return null;
  }

  render() {
    const {
      userState: { haveEarnings, haveSSAAccount, earningsFormat },
      userStateActions: { setHaveEarnings, setHaveSSAAccount, setEarningsFormat },
    } = this.props
    return (
      <React.Fragment>
        <SEO title="Prescreen 1b" keywords={[`social security`, `government`, `retirement`]} />
        <ContentContainer>
          <H2>Step 2: Earnings</H2>
          <TextBlock>
            Your Social Security retirement benefits are calculated based on your earnings in covered employment.
            </TextBlock>
          <br />
          <TextBlock>
            To calculate your Social Security retirement benefits, you will need a record of your earnings from Social Security.
            Follow the steps below to get your earning record.
            </TextBlock>
          {this.checkForBirthday()}

          <Card>
            <QuestionText>Do you have a copy of your earnings record?</QuestionText>
            <AnswerBox>
              <RadioButton type="radio" name="haveEarnings" value="true" onChange={() => setHaveEarnings(true)} checked={haveEarnings === true} />
              <LabelText>Yes</LabelText>
            </AnswerBox>
            <AnswerBox>
              <RadioButton type="radio" name="haveEarnings" value="false" onChange={() => setHaveEarnings(false)} checked={haveEarnings === false} />
              <LabelText>No</LabelText>
            </AnswerBox>
          </Card>

          {haveEarnings === true ?
            <Card>
              <QuestionText>What format is the copy of your earnings record?</QuestionText>
              <AnswerBox>
                <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.XML} onChange={() => setEarningsFormat(EarningsEnum.XML)} checked={earningsFormat === EarningsEnum.XML} />
                <LabelText>XML file (MySocialSecurity)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PDF} onChange={() => setEarningsFormat(EarningsEnum.PDF)} checked={earningsFormat === EarningsEnum.PDF} />
                <LabelText>PDF (MySocialSecurity)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PDFPRINT} onChange={() => setEarningsFormat(EarningsEnum.PDFPRINT)} checked={earningsFormat === EarningsEnum.PDFPRINT} />
                <LabelText>PDF (scanned from print)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PAPER} onChange={() => setEarningsFormat(EarningsEnum.PAPER)} checked={earningsFormat === EarningsEnum.PAPER} />
                <LabelText>Paper (mailed from SSA)</LabelText>
              </AnswerBox>
            </Card> : null
          }

          {haveEarnings === false ?
            <Card>
              <QuestionText>Do you have a MySocialSecurity account?</QuestionText>
              <AnswerBox>
                <RadioButton type="radio" name="haveSSAAccount" value="true" onChange={() => setHaveSSAAccount(true)} checked={haveSSAAccount === true} />
                <LabelText>Yes</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton type="radio" name="haveSSAAccount" value="false" onChange={() => setHaveSSAAccount(false)} checked={haveSSAAccount === false} />
                <LabelText>No</LabelText>
              </AnswerBox>
            </Card> : null
          }

          {haveEarnings === false && haveSSAAccount === true ?
            (
              <HowToContainer>
                <Card>
                  <H2>
                    HOW-TO
                      </H2>
                  <H3>Download your earnings record from MySocialSecurity</H3>
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
            ) : null
          }

          {this.showFileUpload() ?
            <HowToContainer>
              <Card>
                <TextBlock>
                  Please upload your earnings record file
                  </TextBlock>
                <FileUpload manual={false} />
                <TextBlock>
                  Once you have uploaded your earnings record, click next and go forward.
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

          {haveEarnings === false && haveSSAAccount === false ?
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
                  <Link href="https://secure.ssa.gov/RIL/SiView.action">Signup or login to your online account at MySocialSecurity</Link>
                </Card>
              </HowToContainer>
            </> : null
          }
        </ContentContainer>
        <GlosaryStyle>
          <Glossary
            title="MYSOCIALSECURITY"
            link="https://www.ssa.gov/myaccount/"
            linkText="Login or signup online for a MySocialSecurity using this link."
          >
            MySocialSecurity is the Social Security Administrations online service. With a MySocialSecurity account , you can download a copy of your earnings record to use for this question.
          </Glossary>
          {
            this.showFileUpload() == true && <Glossary
              title="IMPORTED RECORDS"
            >
              The values are imported from the file that you upload.
              Please review them for accuracy and correct any errors that you find.
          </Glossary>
          }
          {
            this.showManualTable() === true && <Glossary
              title="MANUAL RECORDS"
            >
              Please review the values so that the years match
              and correct any errors that you find. The first row
              may be a different year than on the paper
              document.
          </Glossary>
          }
        </GlosaryStyle>
      </React.Fragment>
    )
  }
}

export default function Prescreen1bWrapper(): JSX.Element {
  const userState = useUserState()
  const userStateActions = useUserStateActions()
  return <Prescreen1b userState={userState} userStateActions={userStateActions} />
}
