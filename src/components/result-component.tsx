import React from 'react'
import styled from "@emotion/styled";
import { colors, spacing, fontSizes } from "../constants";

// import { ButtonLink, SEO, H2, Card, Message, HelperText, Glossary } from "../components";
import MonthlyBenefit from './monthly-benefit'

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.div`
  margin: 10px 5px 40px; 
  font-size: ${fontSizes[2]};
`

const result = ({number, age}) => {
  return (
    <Flex> { /* flex */}
      <Text>Based on the information you provided, your retirement 
      benefits will be calculated by Social Security as follows:</Text>
      <MonthlyBenefit text={'retirement age'} number={number}/>
      <Text>However, Social Security changes your monthly benefit amount
        if you retire before or after your full retirement age. Use the
        slider below to see how your planned date of retirement will 
        affect your monthly benefit amount.
      </Text>
      <AgeSlider />
      <MonthlyBenefit text={ `age ${age}` } /> 
      {/* <PrintResultsButton /> */}
    </Flex>)
}

export default result