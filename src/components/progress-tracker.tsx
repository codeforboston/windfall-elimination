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
  width: 100%;
  font-weight: 600px;
  padding: 10px 15px;
  font-size: ${fontSizes[1]};
`;

const Circle = styled.div`
  border-radius: 50px;
  background-color: ${props => props.status ? `#433A74`: `#787878`};
  color: white;
  min-width: 25px;
  height: 25px;
  display: block;
  text-align: center;
`;

const StyledStepContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 240px;
  border-right: 1px solid black;
  background: #FAFAFA;
  justify-content: flex-start;
`;

// FIXME: does not check for duplicate paths
function ProgressTracker(props) {
  const indexOfActivePath = props.linkProps.findIndex(element => element.path === props.activePath);
  const links = props.linkProps.map((element, index) => (
      <StyledStep key={element + index} to={element.path} label={element.label} status={Math.sign(index - indexOfActivePath)}>
         {element.label}
      </StyledStep>
  ));
  return <StyledStepContainer>{links}</StyledStepContainer>;
}

export { ProgressTracker };
