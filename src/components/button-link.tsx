import styled from "@emotion/styled";
import { Link } from "gatsby";
import { spacing, colors, fontSizes, radii } from "../constants";

export const ButtonLink = styled(Link)`
    padding: ${spacing[1]} ${spacing[2]};
    margin: ${spacing[2]} ${spacing[2]};
    background-color: ${props =>
      props.disabled ? colors.gray : colors.darkGreen};
    border-radius: ${radii[2]};
    font-size: ${fontSizes[1]};
    color: ${colors.white};
    text-decoration: none;
    display: inline-block;
    border: 2px solid ${colors.darkGreen};
    &:hover {
        background-color: ${colors.white};
        color: ${colors.darkGreen};
        cursor: pointer;
    }
    pointer-events: ${props => props.disabled && "none"};

`;
