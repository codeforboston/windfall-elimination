import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { colors, fontSizes } from "../constants";

const StyledSeparator = styled.div`
  width: 1px;
`;

function Step(props) {
  return (
    <Link to={props.path} className={props.className}>
      {props.label}
    </Link>
  );
}

enum stepStatus {
  complete = -1,
  active,
  ongoing
}

const StyledStep = styled(Step)`
  background-color: ${props => {
    switch (props.status) {
      case stepStatus.complete: {
        return colors.gray;
      }
      case stepStatus.active: {
        return colors.blue;
      }
      case stepStatus.ongoing: {
        return colors.white;
      }
    }
  }};
  color: ${props => {
    switch (props.status) {
      case stepStatus.complete: {
        return colors.white;
      }
      case stepStatus.active: {
        return colors.white;
      }
      case stepStatus.ongoing: {
        return colors.black;
      }
    }
  }};
  padding: 1em 0.5em;
  border: 1px solid black;
`;

// FIXME: does not check for duplicate paths
function ProgressTracker(props) {
  const indexOfActivePath = props.linkProps.findIndex(element => element.path === props.activePath);

  const links = props.linkProps.map((element, index) => (
    <React.Fragment key={element + index}>
      {index ? <StyledSeparator /> : false}
      <StyledStep path={element.path} label={element.label} status={Math.sign(index - indexOfActivePath)} />
    </React.Fragment>
  ));
  return <div className={props.className}>{links}</div>;
}

const StyledProgressTracker = styled(ProgressTracker)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* override html, body font-size CSS rule (was set to 130%) */
  font-size: ${fontSizes[1]};
  margin-top: 30px;


  *:first-child {
    border-radius: 1.5em 0 0 1.5em;
    padding-left: 1em;
  }

  *:last-child {
    border-radius: 0 1.5em 1.5em 0;
    padding-right: 1em;
  }
`;

export { StyledProgressTracker as ProgressTracker };
