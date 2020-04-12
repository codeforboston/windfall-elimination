import styled from "@emotion/styled";
import { Link } from "gatsby";
import { colors, fontSizes, spacing } from "../constants";

export const ButtonLink = (props : {
  children: string;
  isDisabled?: boolean;
  isRightmost?: boolean;
  labelMobile?: string;
  to: string;
}) => (
  <Wrapper
    isDisabled={props.isDisabled}
    isRightmost={props.isRightmost}
    >
    <LinkStyled
      to={props.to}
      data-label={props.children}
      data-label-mobile={props.labelMobile || props.children}
    />
  </Wrapper>
)

const Wrapper = styled.button<{
  isDisabled?: boolean;
  isRightmost?: boolean;
}>`
  background-color: ${props => (
    props.isDisabled ? colors.gray :
    props.isRightmost ? colors.purple :
    colors.green
  )};
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #424440;
  color: ${colors.white};
  display: inline-block;
  font-size: ${fontSizes[1]};
  margin-bottom: 10px;
  margin-right: ${props => props.isRightmost ? "0" : spacing[2]};
  margin-top: 10px;
  outline: none;
  padding: 0;
  pointer-events: ${props => props.isDisabled && "none"};
  text-decoration: none;
  &:hover {
    background-color: ${props => (
      props.isRightmost ? colors.darkPurple : colors.darkGreen
    )};
    cursor: pointer;
  };
`;

const LinkStyled = styled(Link)`
  color: ${colors.white};
  display: block;
  padding: ${spacing[1]} ${spacing[2]};
  text-decoration: none;
  &::after {
    content: attr(data-label);
  };
  @media (max-width: 575px) {
    &::after {
      content: attr(data-label-mobile);
    }
  }
`;
