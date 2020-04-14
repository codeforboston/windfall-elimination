import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { colors, fontSizes } from "../constants";

enum stepStatus {
  complete = -1,
  active,
  ongoing
}

const StyledStep = styled(Link)`
  background-color: ${colors.white};
  color: ${props => {
    switch (props.status) {
      case stepStatus.complete: {
        return `#433A74`;
      }
      case stepStatus.active: {
        return `#433A74`;
      }
      case stepStatus.ongoing: {
        return `#787878`;
      }
    }
  }};
  text-decoration: none;
  font-size: ${fontSizes[1]};
`;

const Circle = styled.div`
  border-radius: 50px;
  background-color: ${props => props.status ?`#787878`: `#433A74`};
  color: white;
  min-width: 30px;
  height: 30px;
  display: flex;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

const Label = styled.h4`
margin: 10px 15px;
font-family: 'Montserrat', sans-serif;
`
const LabelWrap = styled.div`
display: flex;
flex-direction: row;
align-items: center;
max-height: 70px;
margin: 0;
width: 100%;
max-height:65px;
font-weight: 600px;
`

const StyledStepContainer = styled("div")`
  display: block;
  background: #eee;
  justify-content: space-around;
  padding: 10px 15px;
  min-height: 90vh;
  @media (max-width: 767px) {
    width: 100%;
    min-height: auto;
    padding: 10px 0;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    min-height: 60vh;
    width: 195px;
    padding: 10px 5px;
  }
`;

/* these must match the linksProp parameter to this component
TODO: move this outside of component as parameter */
const indexToSessionStorageKeys = {
  1: ["Year62", "BirthDate", "RetireDate"],
  2: ['haveEarnings'],
  3: ['coveredEmployment', 'pensionOrRetirementAccount'],
  4: [],
  5: [],
  6: [],
  7: [],
}

const checkMark = (index, indexOfActivePath) => {
  if (typeof window === 'undefined') {
    return null;
  }
  const sessionKeys = Object.keys(sessionStorage);
  const indexValues = indexToSessionStorageKeys[index];
    for(var i = 0; i < indexValues.length; i++ ){
      const key = indexValues[i]
      if(!sessionKeys.includes(key) || sessionStorage.getItem(key) === 'null'){
        return <Circle status={index > indexOfActivePath}>{index}</Circle>;
      }
    }
    return <Circle>✓</Circle>;

 }

// FIXME: does not check for duplicate paths

function ProgressTracker(props) {
  const indexOfActivePath = props.linkProps.findIndex(element => element.path === props.activePath);
  const links = props.linkProps.map((element, index) => (
      <StyledStep key={element + index} to={element.path} label={element.label} status={Math.sign(index - indexOfActivePath)}>
        <LabelWrap>
        {index==0 || index==4? null: checkMark(index, indexOfActivePath)}
        <Label>{element.label}</Label>
        </LabelWrap>
      </StyledStep>
  ));
  return <StyledStepContainer>{links}</StyledStepContainer>;
}

export { ProgressTracker };
