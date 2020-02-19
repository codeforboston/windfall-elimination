import React from 'react';
import styled from "@emotion/styled";
import { format } from 'd3-format';
import { colors, spacing, fontSizes } from "../constants";

const Benefit = styled.div`
  border-left: 5px solid ${colors.purple};
  font-size: ${fontSizes[2]};
  padding: 0px 20px;
  margin: 5px 30px 30px; /* top, sides, bottom */
`

const Number = styled.div`
  font-size: ${fontSizes[2]};
  margin: 10px 0px 0px;
  padding: 8px;
  width: 20%;
`

const MonthlyBenefit = ({text, number}) => {
  const numFormatted = format("$,.2f")(number)
  return (
    <Benefit>
      Monthly benefit at {text} (FRA)
      <Number>{numFormatted}</Number>
    </Benefit>
  )
};

export default MonthlyBenefit;