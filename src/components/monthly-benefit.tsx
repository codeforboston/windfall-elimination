import React from 'react';
import styled from "@emotion/styled";
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
  return (
    <Benefit>
      Monthly benefit at {text}
      <Number>${number}</Number>
    </Benefit>
  )
};

export default MonthlyBenefit;