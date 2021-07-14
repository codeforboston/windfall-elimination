import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import { colors } from "../constants";
import dayjs from "dayjs";
import {
  Card,
  QuestionText,
  SEO,
  RadioButton,
  AnswerBox,
  LabelText,
  H2,
  Glossary,
  CardGlossaryContainer,
  ContentContainer,
  AnswerInputDiscouragePlaceholder,
} from "../components";
import { PensionEnum, useUserState } from "../library/user-state-context";
import { useUserStateActions } from "../library/user-state-actions-context";
import { gatsbyScrollWhenFinish } from "../constants/config";

const StyledDatePicker = styled(DatePicker)`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 25px;
  min-width: 230px;
  border-radius: 3px;
  padding-left: 10px;
  &::placeholder {
    font-size: 18px;
    font-family: "Montserrat", sans-serif;
  }
`;

const TopQuestionAndTitle = styled.div`
  width: 70%;
  margin-bottom: 75px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Prescreen1c = () => {
  const pensionTypeRef = React.createRef<HTMLDivElement>();
  const pensionAmountRef = React.createRef<HTMLDivElement>();

  const { isEmploymentCovered,
    pensionDateAwarded,
    pensionAmount,
    pensionOrRetirementAccount } = useUserState();
  const {
    setPensionDateAwarded,
    setIsEmploymentCovered,
    setPensionOrRetirementAccount,
    setPensionAmount,
  } = useUserStateActions();

  function scrollToElement(ref: React.RefObject<HTMLDivElement>) {
    if (gatsbyScrollWhenFinish) {
      setTimeout(() => {
        if (ref && ref.current) {
          ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }

  const handleDateAwardedChange = (value: Date) => {
    setPensionDateAwarded(value);
  };

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValueString = e.target.value;
    switch (e.target.name) {
      case "coveredEmployment":
        const isCovered = selectValueString === "true";
        setIsEmploymentCovered(isCovered);
        break;
      case "pensionOrRetirementAccount":
        setPensionOrRetirementAccount(selectValueString as PensionEnum);
        break;
      case "pensionAmount":
        const pensionAmount = parseFloat(e.target.value);
        if (!isNaN(pensionAmount) && pensionAmount > 0) setPensionAmount(pensionAmount);
        else setPensionAmount(0);
        break;
    }
  };

  return (
    <React.Fragment>
      <SEO title='Prescreen 1c' keywords={[`gatsby`, `application`, `react`]} />
      <ContentContainer>
        <CardGlossaryContainer>
          <TopQuestionAndTitle>
            <H2>Step 3: Employment</H2>
            <Card>
              <QuestionText>Do you have earnings that do not show up on your Social Security record?</QuestionText>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='coveredEmployment'
                  value='true'
                  checked={isEmploymentCovered === true}
                  onChange={handleSelection}
                  onClick={() => scrollToElement(pensionTypeRef)}
                />
                <LabelText>Yes</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='coveredEmployment'
                  value='false'
                  checked={isEmploymentCovered === false}
                  onChange={handleSelection}
                />
                <LabelText>No</LabelText>
              </AnswerBox>
            </Card>
          </TopQuestionAndTitle>
          <Glossary title='WHAT EARNINGS WOULD NOT BE ON MY SOCIAL SECURITY EARNINGS RECORD?' link='' linkText=''>
            For example, you may have worked for a state or local government, like a city or town or school system. In
            many states, state and local jobs do not pay into Social Security, which means earnings from these jobs will
            not show up on a Social Security record.
          </Glossary>
        </CardGlossaryContainer>
        {isEmploymentCovered && (
          <CardGlossaryContainer>
            <Card ref={pensionTypeRef}>
              <QuestionText>
                Do you have a pension or retirement account from the work you did that does not show up on your Social
                Security record?
              </QuestionText>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='pensionOrRetirementAccount'
                  value={PensionEnum.PENSION}
                  onChange={handleSelection}
                  onClick={() => scrollToElement(pensionAmountRef)}
                  checked={pensionOrRetirementAccount === PensionEnum.PENSION}
                />
                <LabelText>Monthly pension</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='pensionOrRetirementAccount'
                  value={PensionEnum.LUMPSUM}
                  onChange={handleSelection}
                  onClick={() => scrollToElement(pensionAmountRef)}
                  checked={pensionOrRetirementAccount === PensionEnum.LUMPSUM}
                />
                <LabelText>Retirement account</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type='radio'
                  name='pensionOrRetirementAccount'
                  value={PensionEnum.NONEOFABOVE}
                  onChange={handleSelection}
                  checked={pensionOrRetirementAccount === PensionEnum.NONEOFABOVE}
                />
                <LabelText>None of the above</LabelText>
              </AnswerBox>
            </Card>
            <Glossary
              title='WHAT COUNTS AS A PENSION?'
              link='https://secure.ssa.gov/apps10/poms.nsf/lnx/0300605364'
              linkText='Read the Social Security Administration’s guidance on what counts as a pension here.'
            >
              A pension can be a monthly pension paid out of your employer’s retirement fund, or a lump sum like a
              401(k) or other retirement account based on non-covered employment.
            </Glossary>
          </CardGlossaryContainer>
        )}
        {isEmploymentCovered && pensionOrRetirementAccount && pensionOrRetirementAccount !== PensionEnum.NONEOFABOVE && (
          <>
            <Card>
              <label>
                <QuestionText ref={pensionAmountRef}>
                  Please enter the amount of your monthly pension or lump sum retirement account.
                </QuestionText>
                <AnswerInputDiscouragePlaceholder
                  name='pensionAmount'
                  defaultValue={pensionAmount ?? undefined}
                  placeholder={"0"}
                  onChange={handleSelection}
                ></AnswerInputDiscouragePlaceholder>
              </label>
            </Card>
            {pensionOrRetirementAccount === PensionEnum.LUMPSUM && (
              <Card>
                <QuestionText>
                  Please enter the date you become eligible to start withdrawing from the your retirement account
                  without penalty.
                </QuestionText>
                <StyledDatePicker
                  placeholderText='Click to select a date'
                  selected={pensionDateAwarded}
                  showYearDropdown
                  openToDate={pensionDateAwarded || dayjs().subtract(3, "year").toDate()}
                  onChange={handleDateAwardedChange}
                />
              </Card>
            )}
          </>
        )}
      </ContentContainer>
    </React.Fragment>
  );
};

export default Prescreen1c;
