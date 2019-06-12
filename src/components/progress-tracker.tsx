import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { colors } from "../constants";

const StyledSeparator = styled.div`
  width: 1px;
`;

function Step(props) {
  return (
    <Link to={props.path} className={props.className}>
      {props.path}
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
        return colors.darkGreen;
      }
      case stepStatus.active: {
        return colors.lime;
      }
      case stepStatus.ongoing: {
        return colors.black;
      }
    }
  }};
  color: ${colors.white};
  padding: 1em 0.5em;
`;

// FIXME: does not check for duplicate paths
function ProgressTracker(props) {
  const indexOfActivePath = props.paths.indexOf(props.activePath);

  const links = props.paths.map((path, index) => (
    <React.Fragment key={path}>
      {index ? <StyledSeparator /> : false}
      <StyledStep path={path} status={Math.sign(index - indexOfActivePath)} />
    </React.Fragment>
  ));
  return <div className={props.className}>{links}</div>;
}

const StyledProgressTracker = styled(ProgressTracker)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

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
