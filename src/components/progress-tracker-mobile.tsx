import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import { colors } from "../constants";

// TODO: Add TypeScript. ~ RM
// TODO: Add session storage. ~ RM
export const ProgressTrackerMobile = props => {
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const dropdownHide = () => setIsDropdownShowing(false);
  const dropdownToggle = () => setIsDropdownShowing(prevState => !prevState);
  const testFunction = element => element.path === props.activePath;
  const activePathIndex = props.linkProps.findIndex(testFunction);
  const activePathLabel = props.linkProps[activePathIndex].label;

  const renderContent = (index, label) => {
    const hasVisited = index <= activePathIndex;
    const isPathAStep = index !== 0 && index !== 4;
    const iconLabel = index !== 5 ? index : "✓";

    return (
      <Fragment>
        {isPathAStep &&
          <Circle hasVisited={hasVisited}>
            {iconLabel}
          </Circle>
        }
        <Label hasVisited={hasVisited}>
          {label}
        </Label>
      </Fragment>
    )
  };

  const renderLinks = () => (
    props.linkProps.map((element, index) => (
      <DropdownLink
        key={element + index}
        onClick={dropdownHide}
        to={element.path}
      >
        {renderContent(index, element.label)}
      </DropdownLink>
    ))
  );

  return (
    <Fragment>
      <Wrapper onClick={dropdownToggle}>
        {renderContent(activePathIndex, activePathLabel)}
        <IconSVG
          isPointingDown={!isDropdownShowing}
          viewBox="0 0 100 100"
        >
          <polyline
            fill="none"
            points="0,25 50,75 100,25"
            stroke={colors.gray}
            stroke-width="15"
          />
        </IconSVG>
      </Wrapper>

      {isDropdownShowing &&
        <Mask>
          <Dropdown> {renderLinks()} </Dropdown>
        </Mask>
      }
    </Fragment>
  )
};

const Wrapper = styled.button`
  align-items: center;
  background-color: ${colors.gray2};
  border: none;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  display: flex;
  height: 3rem;
  left: 0;
  outline: none;
  padding-bottom: 0;
  padding-top: 0;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  position: fixed;
  top: 3rem;
  width: 100%;
`;

const Circle = styled.div`
  align-items: center;
  background-color: ${props => props.hasVisited ? colors.purple : colors.gray};
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: 1.125rem;
  height: 1.5rem;
  justify-content: center;
  margin-right: 0.5rem;
  width: 1.5rem;
`;

const Label = styled.h2`
  color: ${props => props.hasVisited ? colors.purple : colors.gray};
  font-family: "Montserrat",sans-serif;
  font-size: 1rem;
  margin: 0;
`;

const IconSVG = styled.svg`
  height: 1rem;
  margin-left: 0.5rem;
  overflow: visible;
  transform: ${props => props.isPointingDown ? null : "rotate(180deg)"};
  width: 1rem;
`;

const Mask = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  height: calc(100vh - 6rem);
  left: 0;
  position: fixed;
  top: 6rem;
  width: 100%;
  z-index: 1;
`;

const Dropdown = styled.div`
  background-color: ${colors.gray2};
  border-top: 0.0625rem solid ${colors.gray};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  left: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  position: fixed;
  top: 6rem;
  width: 100%;
`;

const DropdownLink = styled(Link)`
  display: flex;
  margin-top: 0.5rem;
  text-decoration: none;
`;
