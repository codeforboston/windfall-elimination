// Future Page 1

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
  AnswerInputDiscouragePlaceholder
} from "../components";
import {FutureAWIPredictionEnum, FutureAWITrendEnum, useUserState, UserState} from '../library/user-state-context'
import {useUserStateActions, UserStateActions} from '../library/user-state-actions-context'

const StyledDatePicker = styled(DatePicker)`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 25px;
  min-width: 230px;
  border-radius: 3px;
  padding-left: 10px;
  &::placeholder {
    font-size: 18px;
    font-family: 'Montserrat',sans-serif;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
 
`;

const CardGlossaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0;
  
  @media (max-width: 767px){
    display: block;
  }
`;

const TopQuestionAndTitle = styled.div`
width: 70%;
margin-bottom: 75px;
@media (max-width: 767px){
  width: 100%;
}
`;

interface Prescreen1dProps {
  userState: UserState
  userStateActions: UserStateActions
}

class Prescreen1d extends React.Component<Prescreen1dProps> {
  handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      userStateActions: {
        setAwiTrendOrManualPrediction,
        setAwiTrendSelection
      }
    } = this.props
    const selectValueString = e.target.value;
    switch (e.target.name) {
      case "awiTrendOrManualPrediction":
        setAwiTrendOrManualPrediction(selectValueString as FutureAWIPredictionEnum)
        break;
      case "awiTrendSelection":
        setAwiTrendSelection(selectValueString as FutureAWITrendEnum)
        break;
    }
  }

  render() {
    const {
      userState: {
        pensionDateAwarded,
        pensionAmount,
        awiTrendOrManualPrediction,
        awiTrendSelection
      }
    } = this.props
    return (
      <React.Fragment>
        <SEO
          title="Prescreen 1D"
          keywords={[`gatsby`, `application`, `react`]}
        />
        <ContentContainer>
          <CardGlossaryContainer>
          <TopQuestionAndTitle><H2>Your Earnings In the Years Ahead</H2>
            <Card>
              <QuestionText>
                How would you like to estimate your future earnings?
              </QuestionText>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="awiTrendOrManualPrediction"
                  value={FutureAWIPredictionEnum.TREND}
                  onChange={this.handleSelection}
                  checked={awiTrendOrManualPrediction === FutureAWIPredictionEnum.TREND}
                />
                <LabelText>Use Economic Trends</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="awiTrendOrManualPrediction"
                  value={FutureAWIPredictionEnum.MANUAL}
                  onChange={this.handleSelection}
                  checked={awiTrendOrManualPrediction === FutureAWIPredictionEnum.MANUAL}
                />
                <LabelText>Predict it myself</LabelText>
              </AnswerBox>
            </Card>
            </TopQuestionAndTitle>
            <Glossary
          title="WHAT EARNINGS WOULD NOT BE ON MY SOCIAL SECURITY EARNINGS RECORD?"
          link="http://www.ncsssa.org/statessadminmenu.html"
          linkText=""
        >
          For example, you may have worked for a state or local government, like
          a city or town or school system. In many states, state and local jobs
          do not pay into Social Security, which means earnings from these jobs
          will not show up on a Social Security record.
        </Glossary>
            </CardGlossaryContainer>
            {awiTrendOrManualPrediction && (
            <CardGlossaryContainer>
              <Card>
                <QuestionText>
                Which trend would you like to use to predict your future earnings?
                </QuestionText>
                <AnswerBox>
                  <RadioButton type="radio" name="isLowIntOrHigh" value={FutureAWITrendEnum.INTERMEDIATE} onChange={this.handleSelection} checked={isLowIntOrHigh === FutureAWITrendEnum.INTERMEDIATE} />
                  <LabelText>Int (Between Low and High)</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="isLowIntOrHigh" value={FutureAWITrendEnum.LOW} onChange={this.handleSelection} checked={isLowIntOrHigh === FutureAWITrendEnum.LOW} />
                  <LabelText>Low (Economy doesn’t go well)</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="isLowIntOrHigh" value={FutureAWITrendEnum.HIGH} onChange={this.handleSelection} checked={isLowIntOrHigh === FutureAWITrendEnum.HIGH} />
                  <LabelText>High (Economy goes well)</LabelText>
                </AnswerBox>
              </Card>
              <Glossary
              title="WHAT COUNTS AS A PENSION?"
              link="https://secure.ssa.gov/apps10/poms.nsf/lnx/0300605364"
              linkText="Read the Social Security Administration’s guidance on what counts as a pension here."
              >
              A pension can be a monthly pension paid our of your employer’s retirement fund, or a lump sum like a 401(k) or other retirement account based on non-covered employment.
              </Glossary>
            </CardGlossaryContainer>
            )}
            {awiTrendOrManualPrediction && isLowIntOrHigh && (
              <>
              <Card>
                <label>
                  <QuestionText>
                    Please enter the amount of your monthly pension or lump sum retirement account.
                  </QuestionText>
                  <AnswerInputDiscouragePlaceholder
                    name="pensionAmount"
                    defaultValue={pensionAmount ?? undefined}
                    placeholder={'0'}  
                    onChange={this.handleSelection}
                  ></AnswerInputDiscouragePlaceholder>
                </label>
              </Card>
              {awiTrendOrManualPrediction === FutureAWITrendEnum.LOW && (
                <Card>
                    <QuestionText>
                      Please enter the date you become eligible to start withdrawing from the your retirement account without penalty.
                    </QuestionText>
                    <StyledDatePicker
                    placeholderText="Click to select a date"
                    selected={pensionDateAwarded}
                    showYearDropdown
                    openToDate={pensionDateAwarded || dayjs().subtract(3, 'year').toDate()}
                    onChange={this.handleDateAwardedChange}
                    />
                </Card>
              )}
              </>
            )}
        </ContentContainer>
      </React.Fragment>
    );
  }
}

export default function Prescreen1dWrapper(): JSX.Element {
  const userState = useUserState()
  const userStateActions = useUserStateActions()
  return <Prescreen1d userState={userState} userStateActions={userStateActions} />
}
