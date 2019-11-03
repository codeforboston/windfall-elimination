import styled from "@emotion/styled";
import { spacing, colors, fontSizes, radii } from "../constants";

export const PrintButton = styled("button")`
padding: 20px 60px;
background-color: ${props =>
  props.disabled ? colors.gray : colors.purple};
border-radius: 5px;
font-size: ${fontSizes[1]};
color: ${colors.white};
text-decoration: none;
display: inline-block;
border: 2px solid ${props =>
  props.disabled ? colors.gray : colors.purple};;
box-shadow: 2px 2px 2px #424440;
&:hover {
  background-color: ${colors.darkPurple};
  border: 2px solid ${colors.darkPurple};
  color: ${colors.white};
  cursor: pointer;
}
  pointer-events: ${props => props.disabled && "none"};
`;