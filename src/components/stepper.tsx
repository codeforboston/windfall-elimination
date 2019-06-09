import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

function Separator() {
  return <span>-</span>;
}

function Step(props) {
  return (
    <Link to={props.path} activeStyle={{ color: "red" }}>
      {props.path}
    </Link>
  );
}

function Stepper(props) {
  const links = props.paths.map((path, index) => (
    <React.Fragment>
      {index ? <Separator /> : false}
      <Step path={path} />
    </React.Fragment>
  ));
  return <div className={props.className}>{links}</div>;
}

const StyledStepper = styled(Stepper)`
  display: flex;
  justify-content: space-between;
`;

export { StyledStepper as Stepper };
