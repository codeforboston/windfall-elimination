import styled from "@emotion/styled";
import { spacing, colors, fontSizes, radii } from "../constants";

export const PrintButton = styled("button")`
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
    background-color: ${colors.white};
    color: ${colors.blue};
    cursor: pointer;
  }
  pointer-events: ${props => props.disabled && "none"};
`;