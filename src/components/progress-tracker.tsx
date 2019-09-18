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
  padding: 1em 0.5em;
  border-right: 1px solid black;
  text-decoration: none;
  background-color: #FAFAFA;
`;

// FIXME: does not check for duplicate paths
function ProgressTracker(props) {
  const indexOfActivePath = props.linkProps.findIndex(element => element.path === props.activePath);

  const links = props.linkProps.map((element, index) => (
    <React.Fragment key={element}>
      {index ? <StyledSeparator /> : false}
      <StyledStep path={element.path} label={element.label} status={Math.sign(index - indexOfActivePath)} />
    </React.Fragment>
  ));
  return <div className={props.className}>{links}</div>;
}

const StyledProgressTracker = styled(ProgressTracker)`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  /* override html, body font-size CSS rule (was set to 130%) */
  font-size: ${fontSizes[1]};
  padding: 0 15px;

  *:first-child {
  }

  *:last-child {
  }
`;

export { StyledProgressTracker as ProgressTracker };
