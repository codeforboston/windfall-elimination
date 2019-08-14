import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { colors, breakPoints } from "../constants";

const StyledSeparator = styled.div`
  width: calc(1.5em + 0.5em);
`;

function Step(props) {
  return (
    <Link to={props.path} className={props.className}>
      <span className="label">{props.label}</span>
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
        return '#06315e';
      }
      case stepStatus.active: {
        return colors.blue;
      }
      case stepStatus.ongoing: {
        return '#fafafa';
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
  box-shadow: 1px 1px 2px;
  text-decoration-line: none;
  
  @media (max-width: ${breakPoints[3]}) {
    .label {
      display: ${({ status }) => {
        switch (status) {
          case stepStatus.complete: {
            return 'none';
          }
          case stepStatus.active: {
            return 'inline-block';
          }
          case stepStatus.ongoing: {
            return 'none';
          }
        }
      }};
    }
  }
  
  position: relative;
  :before {
    content: "";

    /* FIXME: current border-width is a magic number */
    border-left: 1.5em solid transparent;
    border-top: 1.5em solid ${props => {
      switch (props.status) {
        case stepStatus.complete: {
          return '#06315e';
        }
        case stepStatus.active: {
          return colors.blue;
        }
        case stepStatus.ongoing: {
          return '#fafafa';
        }
      }
    }};
    border-bottom: 1.5em solid ${props => {
      switch (props.status) {
        case stepStatus.complete: {
          return '#06315e';
        }
        case stepStatus.active: {
          return colors.blue;
        }
        case stepStatus.ongoing: {
          return '#fafafa';
        }
      }
    }};

    position: absolute;
    bottom: 0;
    left: -1.5em;
  }
  :after {
    content: "";

    /* FIXME: current border-width is a magic number */
    border-left: 1.5em solid ${props => {
      switch (props.status) {
        case stepStatus.complete: {
          return '#06315e';
        }
        case stepStatus.active: {
          return colors.blue;
        }
        case stepStatus.ongoing: {
          return '#fafafa';
        }
      }
    }};
    border-top: 1.5em solid transparent;
    border-bottom: 1.5em solid transparent;

    position: absolute;
    bottom: 0;
    right: -1.5em;
  }
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
  justify-content: center;
  flex-wrap: wrap;
  /* override html, body font-size CSS rule (was set to 130%) */
  font-size: 100;

  /*
  *:first-child {
    border-radius: 1.5em 0 0 1.5em;
    padding-left: 1em;
  }

  *:last-child {
    border-radius: 0 1.5em 1.5em 0;
    padding-right: 1em;
  }
  */
`;

export { StyledProgressTracker as ProgressTracker };
