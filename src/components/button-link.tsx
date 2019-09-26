import styled from "@emotion/styled";
import { Link } from "gatsby";
import { spacing, colors, fontSizes, radii } from "../constants";

export const ButtonLink = styled(Link)`
  padding: ${spacing[1]} ${spacing[2]};
  margin: ${spacing[2]} ${spacing[2]};
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
    background-color: ${colors.gray};
    border: 2px solid ${colors.gray};
    color: ${colors.white};
    cursor: pointer;
  }
  pointer-events: ${props => props.disabled && "none"};
`;
