import styled from "@emotion/styled";
import { Link } from "gatsby";
import { spacing, colors, fontSizes, radii } from "../constants";

export const ButtonLink = styled(Link)`
  padding: ${spacing[1]} ${spacing[2]};
  margin: ${spacing[2]} ${spacing[2]};
  background-color: ${props =>
    props.disabled ? colors.gray : colors.blue};
  border-radius: ${radii[2]};
  font-size: ${fontSizes[1]};
  color: ${colors.white};
  text-decoration: none;
  display: inline-block;
  border: 2px solid ${colors.blue};
  box-shadow: 5px 5px 5px #424440;
  &:hover {
    background-color: ${colors.darkBlue};
    color: ${colors.white};
    cursor: pointer;
    box-shadow: 0px -1px 15px ${colors.gray};
  }
  pointer-events: ${props => props.disabled && "none"};
`;
