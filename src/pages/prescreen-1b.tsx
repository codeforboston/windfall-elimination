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
} from "../components";
import {
  UserState,
  EarningsEnum,
  useUserState,
} from "../library/user-state-context";
import {
  UserStateActions,
  useUserStateActions,
} from "../library/user-state-actions-context";
import { PiaFormat } from "../library/pia/pia-format";

export const SsaImage = styled("img")`
  border: 1px solid #dddddd;
  width: 500px;
  margin-top: 25px;
`;

const CardGlossaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0;

  @media (max-width: 767px) {
    display: block;
  }
`;

const HowToContainer = styled.div`
  display: block;
`;

const ContentContainer = styled.div`
  width: 100%;
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

interface Prescreen1bProps {
  userState: UserState;
  userStateActions: UserStateActions;
}

class Prescreen1b extends React.Component<Prescreen1bProps> {
  constructor(props: Prescreen1bProps) {
    super(props);
    this.showFileUpload = this.showFileUpload.bind(this);
    this.showManualTable = this.showManualTable.bind(this);
  }

  showFileUpload() {
    const {
      userState: { haveEarnings, haveSSAAccount, earningsFormat },
    } = this.props;
    return (
      (haveEarnings === false && haveSSAAccount === true) ||
      (haveEarnings === true &&
        (earningsFormat === EarningsEnum.XML ||
          earningsFormat === EarningsEnum.PDF))
    );
  }

  showManualTable() {
    const {
      userState: { haveEarnings, earningsFormat },
    } = this.props;
    return (
      haveEarnings === true &&
      (earningsFormat === EarningsEnum.PDFPRINT ||
        earningsFormat === EarningsEnum.PAPER)
    );
  }

  checkForBirthday = () => {
    const {
      userState: { birthDate },
    } = this.props;
    if (birthDate === null) {
      return (
        <WarningBox>
          <label>
            Please go back and fill out appropriate birthdate before going
            forward.{" "}
          </label>
        </WarningBox>
      );
    }

    return null;
  };

  render() {
    const {
      userState: { haveEarnings, haveSSAAccount, earningsFormat },
      userStateActions: {
        setHaveEarnings,
        setHaveSSAAccount,
        setEarningsFormat,
      },
    } = this.props;

    const sample1pia = `01123450001001151954
031012020
0619752019
071  0.002008
081  0.002008
16Sample 1
201
402017221
95 12 12`;

    // 20: correct number of characters on 20/21 based on 6,7 and 8. within 0 and 4 on 20.
    // 20 is one field
    // 21 is a field: array for all the types of taxes for years you're working (why is no taxes in our examples)
    // 22-29 is a field: array for all your earnings. really a single list. Serialized and deserialized in one
    // we need logic for the last one

    //cross validating line 20 correspond to 22-29
    //combine the related values

    const sample20pia = `01123450020006221952
031072014
0619662010
12   1500.00062010
16Sample 20
20000000000000000000000000000000000000011111110
22     800.00    4100.00    4000.00    3700.00    4600.00    7300.00    9000.00   10800.00   12000.00   11700.00
23   14100.00    6400.00   11600.00    5000.00       0.00       0.00       0.00       0.00       0.00       0.00
24       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00
25       0.00       0.00       0.00       0.00       0.00       0.00   20000.00  104400.00  105480.00  108000.00
26  113040.00  117000.00  122400.00  128160.00   35000.00
95 40 40`;

    const sample25pia = `01123450025009021960
031092022
0619812020
072  0.001990
082  0.002011
12   1500.00102022
16Sample 25
22    2000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00
23    4000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00
24    6000.00    8000.00
402017551`;
    const pia1Inputter = new PiaFormat(sample1pia, "sample1.pia");
    const pia20Inputter = new PiaFormat(sample20pia, "sample20.pia");
    const pia25Inputter = new PiaFormat(sample25pia, "sample25.pia");
    console.assert(
      pia1Inputter.outputPia() === sample1pia,
      "sample1.pia",
      pia1Inputter.outputPia()
    );
    console.assert(
      pia20Inputter.outputPia() === sample20pia,
      "sample20.pia",
      pia20Inputter.outputPia()
    );
    console.log(pia25Inputter.outputPia());
    console.assert(
      pia25Inputter.outputPia() === sample25pia,
      "sample25.pia",
      pia25Inputter.outputPia()
    );

    return (
      <React.Fragment>
        <SEO
          title="Prescreen 1b"
          keywords={[`social security`, `government`, `retirement`]}
        />
        <ContentContainer>
          <CardGlossaryContainer>
            <TopQuestionAndTitle>
              <H2>Step 2: Earnings</H2>
              <TextBlock>
                Your Social Security retirement benefits are calculated based on
                your earnings in covered employment.
              </TextBlock>
              <br />
              <TextBlock>
                To calculate your Social Security retirement benefits, you will
                need a record of your earnings from Social Security. Follow the
                steps below to get your earning record.
              </TextBlock>
              {this.checkForBirthday()}

              <Card>
                <QuestionText>
                  Do you have a copy of your earnings record?
                </QuestionText>
                <AnswerBox>
                  <RadioButton
                    type="radio"
                    name="haveEarnings"
                    value="true"
                    onChange={() => setHaveEarnings(true)}
                    checked={haveEarnings === true}
                  />
                  <LabelText>Yes</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton
                    type="radio"
                    name="haveEarnings"
                    value="false"
                    onChange={() => setHaveEarnings(false)}
                    checked={haveEarnings === false}
                  />
                  <LabelText>No</LabelText>
                </AnswerBox>
              </Card>
            </TopQuestionAndTitle>
            <Glossary
              title="MYSOCIALSECURITY"
              link="https://www.ssa.gov/myaccount/"
              linkText="Login or signup online for a MySocialSecurity using this link."
            >
              MySocialSecurity is the Social Security Administrations online
              service. With a MySocialSecurity account , you can download a copy
              of your earnings record to use for this question.
            </Glossary>
          </CardGlossaryContainer>

          {haveEarnings === true ? (
            <Card>
              <QuestionText>
                What format is the copy of your earnings record?
              </QuestionText>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="earningsFormat"
                  value={EarningsEnum.XML}
                  onChange={() => setEarningsFormat(EarningsEnum.XML)}
                  checked={earningsFormat === EarningsEnum.XML}
                />
                <LabelText>XML file (MySocialSecurity)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="earningsFormat"
                  value={EarningsEnum.PDF}
                  onChange={() => setEarningsFormat(EarningsEnum.PDF)}
                  checked={earningsFormat === EarningsEnum.PDF}
                />
                <LabelText>PDF (MySocialSecurity)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="earningsFormat"
                  value={EarningsEnum.PDFPRINT}
                  onChange={() => setEarningsFormat(EarningsEnum.PDFPRINT)}
                  checked={earningsFormat === EarningsEnum.PDFPRINT}
                />
                <LabelText>PDF (scanned from print)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="earningsFormat"
                  value={EarningsEnum.PAPER}
                  onChange={() => setEarningsFormat(EarningsEnum.PAPER)}
                  checked={earningsFormat === EarningsEnum.PAPER}
                />
                <LabelText>Paper (mailed from SSA)</LabelText>
              </AnswerBox>
            </Card>
          ) : null}

          {haveEarnings === false ? (
            <Card>
              <QuestionText>
                Do you have a MySocialSecurity account?
              </QuestionText>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="haveSSAAccount"
                  value="true"
                  onChange={() => setHaveSSAAccount(true)}
                  checked={haveSSAAccount === true}
                />
                <LabelText>Yes</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="haveSSAAccount"
                  value="false"
                  onChange={() => setHaveSSAAccount(false)}
                  checked={haveSSAAccount === false}
                />
                <LabelText>No</LabelText>
              </AnswerBox>
            </Card>
          ) : null}
          {haveEarnings === false && haveSSAAccount === true ? (
            <HowToContainer>
              <Card>
                <H2>HOW-TO</H2>
                <h3>Download your earnings record from MySocialSecurity</h3>
                <WarningBox>
                  This how-to will show you how to download your personal Social
                  Security information. Only follow these steps if you are using
                  a private computer. If you only have access to a public
                  computer - like those at a library, school, or computer lab -
                  please click here to be shown instructions for requesting a
                  physical copy of your earnings record in the mail.
                </WarningBox>
                <ul>
                  <ol>1) Log in to your MySocialSecurity account</ol>
                  <ol>
                    2) Click on “Download Your Statement Data”, as seen in the
                    red box in the photo below.
                  </ol>
                  <SsaImage src="https://user-images.githubusercontent.com/50156013/56998273-bcd78800-6b78-11e9-86b5-9db06d292a4c.jpg" />
                  <ol>3) Save the XML file to your computer.</ol>
                  <ol>4) Upload the XML file using the tool below.</ol>
                </ul>
              </Card>
            </HowToContainer>
          ) : null}
          {this.showFileUpload() ? (
            <HowToContainer>
              <Card>
                <TextBlock>Please upload your earnings record file</TextBlock>
                <FileUpload manual={false} />
                <TextBlock>
                  Once you have uploaded your earnings record, click next and go
                  forward.
                </TextBlock>
              </Card>
            </HowToContainer>
          ) : null}

          {this.showManualTable() && (
            <div>
              <CardGlossaryContainer>
                <Card>
                  <TextBlock>
                    Please enter the “Taxed Social Security Earnings” amounts
                    from your earnings record.
                  </TextBlock>
                </Card>

                {this.showFileUpload() == true && (
                  <Glossary title="IMPORTED RECORDS">
                    The values are imported from the file that you upload.
                    Please review them for accuracy and correct any errors that
                    you find.
                  </Glossary>
                )}
                {this.showManualTable() === true && (
                  <Glossary title="MANUAL RECORDS">
                    Please review the values so that the years match and correct
                    any errors that you find. The first row may be a different
                    year than on the paper document.
                  </Glossary>
                )}
              </CardGlossaryContainer>
              <Card>
                <FileUpload manual={true} />
              </Card>
            </div>
          )}

          {haveEarnings === false && haveSSAAccount === false ? (
            <>
              <HowToContainer>
                <Card>
                  <H2>HOW-TO</H2>
                  <h3>
                    Request a copy of your earnings report through the mail
                  </h3>
                  <WarningBox>
                    We cannot estimate your WEP without a copy of your earnings
                    record. The How-to’s linked below will tell you how to get
                    your earnings record through the mail, or by signing up for
                    a MySocialSecurity account online.
                  </WarningBox>
                </Card>
              </HowToContainer>
              <HowToContainer>
                <Card>
                  <H2>Browse to the HOW-TO</H2>
                  <ul>
                    <li>
                      <Link href="https://faq.ssa.gov/en-us/Topic/article/KA-01741">
                        Read the guide.
                      </Link>
                    </li>
                    <li>
                      <Link href="https://secure.ssa.gov/RIL/SiView.action">
                        Signup or login to your online account at
                        MySocialSecurity
                      </Link>
                    </li>
                  </ul>
                </Card>
              </HowToContainer>
            </>
          ) : null}
        </ContentContainer>
      </React.Fragment>
    );
  }
}

export default function Prescreen1bWrapper(): JSX.Element {
  const userState = useUserState();
  const userStateActions = useUserStateActions();
  return (
    <Prescreen1b userState={userState} userStateActions={userStateActions} />
  );
}
