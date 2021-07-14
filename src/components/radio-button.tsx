import styled from "@emotion/styled";
import { colors } from "../constants";
import { ClassNames } from "@emotion/react";
import React, { ReactChildren } from "react";

export const RadioButton = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.lightblue};
  height: 40px;
  width: 40px;
  font-size: 18px;
  border-radius: 25px;
  background-color: #eee;
  border-radius: 50%;

  &:checked {
    border: 3px solid ${colors.white};
    border-radius: 100px;
    color: ${colors.white};
    background-color: ${colors.purple};

    &:after {
      content: " ";
      height: 15px;
      width: 10px;
      background-color: #fff;
      padding-left: 5px;
      margin-left: 7.5px;
      border: 2px solid #fff;
      border-radius: 100px;
      margin-top: 7.5px;
      display: inline-block;
    }
  }
`;

/* Look for radiobuttons inside this component that have checked children and set a special class */
/* this might be refactorable to use style with https://stackoverflow.com/a/44646995/272018
 *  but I couldn't get it to work */
export const AnswerBoxBasic = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNodeArray;
}) => {
  const hasCheckedChildren =
    children &&
    children.filter((n) => {
      const nElement = n as React.ReactElement;
      nElement.props.checked === "true" || nElement.props.checked === true;
    }).length > 0;

  return (
    <ClassNames>
      {({ css, cx }) => (
        <label
          {...props}
          className={[
            className || "",
            hasCheckedChildren &&
              css`
                background-color: ${colors.purple};
                color: #fff;
              `,
          ].join(" ")}
        >
          {children}
        </label>
      )}
    </ClassNames>
  );
};

export const LabelText = styled.span`
  font-size: 18px;
`;

export const AnswerBox = styled(AnswerBoxBasic)`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 18px;
  width: 300px;
  border-radius: 3px;
  padding: 5px;
  display: flex;
  align-items: center;
  margin: 10px 0;

  @media (max-width: 767px) {
    width: 90%;
  }
`;

export const AnswerInput = styled.input`
  border: 2px solid ${colors.purple};
  height: 50px;
  width: 200px;
  border-radius: 3px;
  display: flex;
  margin: 10px 0;
  padding: 0 10px;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
`;

export const AnswerInputDiscouragePlaceholder = styled(AnswerInput)`
  &::placeholder {
    color: red;
    font-size: 1.1em;
  }
`;
