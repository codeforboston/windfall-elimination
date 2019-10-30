import styled from "@emotion/styled";
import { ButtonLink } from "../components";
import { colors, spacing, fontSizes } from "../constants";

export const ButtonLinkGreen = styled(ButtonLink)`
  padding: ${spacing[1]} ${spacing[2]};
  background-color: ${props =>
    props.disabled ? colors.gray : colors.green};
  border-radius: 5px;
  margin-right: 25px;
  font-size: ${fontSizes[1]};
  color: white;
  text-decoration: none;
  display: inline-block;
  border: 2px solid ${colors.green};
  box-shadow: 2px 2px 2px #424440;
  &:hover {
    background-color: ${colors.darkGreen};
    border: 2px solid ${colors.darkGreen};
    color: ${colors.white};
    cursor: pointer;
  }
  pointer-events: ${props => props.disabled && "none"};
`;
