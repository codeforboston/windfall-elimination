import React from "react";
import styled from "@emotion/styled";
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
  WarningBox,
  CardGlossaryContainer,
  ContentContainer,
} from "../components";
import { EarningsEnum, useUserState } from "../library/user-state-context";
import { useUserStateActions } from "../library/user-state-actions-context";
import { gatsbyScrollWhenFinish } from "../constants/config";

export const SsaImage = styled("img")`
  border: 1px solid #dddddd;
  width: 500px;
  margin-top: 25px;
`;

const HowToContainer = styled.div`
  display: block;
`;

const TopQuestionAndTitle = styled.div`
  width: 70%;
  margin-bottom: 75px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Link = styled.a`
  color: black;
  font-weight: 600;
  overflow-wrap: break-word;
`;


const Prescreen1b = () => {
  const earningsSelectRef = React.createRef<HTMLDivElement>();
  const howToRef = React.createRef<HTMLDivElement>();
  const earningsRecordRef = React.createRef<HTMLDivElement>();

  const { birthDate, haveEarnings, haveSSAAccount, earningsFormat } = useUserState();
  const {  setHaveEarnings, setHaveSSAAccount, setEarningsFormat } = useUserStateActions();

  function scrollToElement(ref: React.RefObject<HTMLDivElement>) {
    if (gatsbyScrollWhenFinish) {
      const node = ref.current;
      setTimeout(() => {
        if (node) {
          node.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }

  function showFileUpload() {
    return (
      (haveEarnings === false && haveSSAAccount === true) ||
      (haveEarnings === true && (earningsFormat === EarningsEnum.XML || earningsFormat === EarningsEnum.PDF))
    );
  }

  function showManualTable() {
    return haveEarnings === true && (earningsFormat === EarningsEnum.PDFPRINT || earningsFormat === EarningsEnum.PAPER);
  }

  const checkForBirthday = () => {
    if (birthDate === null) {
      return (
        <WarningBox>
          <label>Please go back and fill out appropriate birthdate before going forward. </label>
        </WarningBox>
      );
    }

    return null;
  };

  return (
    <React.Fragment>
      <SEO title='Prescreen 1b' keywords={[`social security`, `government`, `retirement`]} />
      <ContentContainer>
        <CardGlossaryContainer>
          <TopQuestionAndTitle>
            <H2>Step 2: Earnings</H2>
            <TextBlock>
              Your Social Security retirement benefits are calculated based on your earnings in covered employment.
            </TextBlock>
            <br />
            <TextBlock>
              To calculate your Social Security retirement benefits, you will need a record of your earnings from Social
              Security. Follow the steps below to get your earning record.
            </TextBlock>
            {checkForBirthday()}

            <Card>
              <QuestionText>Do you have a copy of your earnings record?</QuestionText>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='haveEarnings'
                  value='true'
                  onChange={() => setHaveEarnings(true)}
                  onClick={() => scrollToElement(earningsSelectRef)}
                  checked={haveEarnings === true}
                />
                <LabelText>Yes</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='haveEarnings'
                  value='false'
                  onChange={() => setHaveEarnings(false)}
                  onClick={() => scrollToElement(earningsSelectRef)}
                  checked={haveEarnings === false}
                />
                <LabelText>No</LabelText>
              </AnswerBox>
            </Card>
          </TopQuestionAndTitle>
          <Glossary
            title='MYSOCIALSECURITY'
            link='https://www.ssa.gov/myaccount/'
            linkText='Login or signup online for a MySocialSecurity using this link.'
          >
            MySocialSecurity is the Social Security Administrations online service. With a MySocialSecurity account ,
            you can download a copy of your earnings record to use for this question.
          </Glossary>
        </CardGlossaryContainer>
        <div ref={earningsSelectRef}>
          {haveEarnings === true ? (
            <Card>
              <QuestionText>What format is the copy of your earnings record?</QuestionText>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='earningsFormat'
                  value={EarningsEnum.XML}
                  onChange={() => setEarningsFormat(EarningsEnum.XML)}
                  onClick={() => scrollToElement(earningsRecordRef)}
                  checked={earningsFormat === EarningsEnum.XML}
                />
                <LabelText>XML file (MySocialSecurity)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='earningsFormat'
                  value={EarningsEnum.PDF}
                  onChange={() => setEarningsFormat(EarningsEnum.PDF)}
                  onClick={() => scrollToElement(earningsRecordRef)}
                  checked={earningsFormat === EarningsEnum.PDF}
                />
                <LabelText>PDF (MySocialSecurity)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='earningsFormat'
                  value={EarningsEnum.PDFPRINT}
                  onChange={() => setEarningsFormat(EarningsEnum.PDFPRINT)}
                  onClick={() => scrollToElement(earningsRecordRef)}
                  checked={earningsFormat === EarningsEnum.PDFPRINT}
                />
                <LabelText>PDF (scanned from print)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='earningsFormat'
                  value={EarningsEnum.PAPER}
                  onChange={() => setEarningsFormat(EarningsEnum.PAPER)}
                  onClick={() => scrollToElement(earningsRecordRef)}
                  checked={earningsFormat === EarningsEnum.PAPER}
                />
                <LabelText>Paper (mailed from SSA)</LabelText>
              </AnswerBox>
            </Card>
          ) : null}

          {haveEarnings === false ? (
            <Card>
              <QuestionText>Do you have a MySocialSecurity account?</QuestionText>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='haveSSAAccount'
                  value='true'
                  onChange={() => setHaveSSAAccount(true)}
                  onClick={() => scrollToElement(howToRef)}
                  checked={haveSSAAccount === true}
                />
                <LabelText>Yes</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='haveSSAAccount'
                  value='false'
                  onChange={() => setHaveSSAAccount(false)}
                  onClick={() => scrollToElement(howToRef)}
                  checked={haveSSAAccount === false}
                />
                <LabelText>No</LabelText>
              </AnswerBox>
            </Card>
          ) : null}
        </div>
        <div ref={howToRef}>
          {haveEarnings === false && haveSSAAccount === true ? (
            <HowToContainer>
              <Card>
                <H2>HOW-TO</H2>
                <h3>Download your earnings record from MySocialSecurity</h3>
                <WarningBox>
                  This how-to will show you how to download your personal Social Security information. Only follow these
                  steps if you are using a private computer. If you only have access to a public computer - like those
                  at a library, school, or computer lab - please click here to be shown instructions for requesting a
                  physical copy of your earnings record in the mail.
                </WarningBox>
                <ul>
                  <ol>1) Log in to your MySocialSecurity account</ol>
                  <ol>2) Click on “Download Your Statement Data”, as seen in the red box in the photo below.</ol>
                  <SsaImage src='https://user-images.githubusercontent.com/50156013/56998273-bcd78800-6b78-11e9-86b5-9db06d292a4c.jpg' />
                  <ol>3) Save the XML file to your computer.</ol>
                  <ol>4) Upload the XML file using the tool below.</ol>
                </ul>
              </Card>
            </HowToContainer>
          ) : null}

          <div ref={earningsRecordRef}>
            {showFileUpload() ? (
              <HowToContainer>
                <Card>
                  <TextBlock>Please upload your earnings record file</TextBlock>
                  <FileUpload manual={false} />
                  <TextBlock>Once you have uploaded your earnings record, click next and go forward.</TextBlock>
                </Card>
              </HowToContainer>
            ) : null}

            {showManualTable() && (
              <div>
                <CardGlossaryContainer>
                  <Card>
                    <TextBlock>
                      Please enter the “Taxed Social Security Earnings” amounts from your earnings record.
                    </TextBlock>
                  </Card>

                  {showFileUpload() == true && (
                    <Glossary title='IMPORTED RECORDS'>
                      The values are imported from the file that you upload. Please review them for accuracy and correct
                      any errors that you find.
                    </Glossary>
                  )}
                  {showManualTable() === true && (
                    <Glossary title='MANUAL RECORDS'>
                      Please review the values so that the years match and correct any errors that you find. The first
                      row may be a different year than on the paper document.
                    </Glossary>
                  )}
                </CardGlossaryContainer>
                <Card>
                  <FileUpload manual={true} />
                </Card>
              </div>
            )}
          </div>

          {haveEarnings === false && haveSSAAccount === false ? (
            <>
              <HowToContainer>
                <Card>
                  <H2>HOW-TO</H2>
                  <h3>Request a copy of your earnings report through the mail</h3>
                  <WarningBox>
                    We cannot estimate your WEP without a copy of your earnings record. The How-to’s linked below will
                    tell you how to get your earnings record through the mail, or by signing up for a MySocialSecurity
                    account online.
                  </WarningBox>
                </Card>
              </HowToContainer>
              <HowToContainer>
                <Card>
                  <H2>Browse to the HOW-TO</H2>
                  <ul>
                    <li>
                      <Link href='https://faq.ssa.gov/en-us/Topic/article/KA-01741'>Read the guide.</Link>
                    </li>
                    <li>
                      <Link href='https://secure.ssa.gov/RIL/SiView.action'>
                        Signup or login to your online account at MySocialSecurity
                      </Link>
                    </li>
                  </ul>
                </Card>
              </HowToContainer>
            </>
          ) : null}
        </div>
      </ContentContainer>
    </React.Fragment>
  );
}

export default Prescreen1b;