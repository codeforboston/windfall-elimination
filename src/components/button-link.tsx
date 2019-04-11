import styled from "@emotion/styled";
import { Link } from "gatsby";
import { spacing, colors, fontSizes, radii } from "../constants";

export const ButtonLink = styled(Link)`
    padding: ${spacing[1]} ${spacing[2]};
    margin: ${spacing[2]} ${spacing[2]};
    background-color: ${colors.blue};
    font-size: ${fontSizes[1]};
    border-radius: ${radii[2]};
    color: ${colors.white};
    text-decoration: none;
    display: inline-block;
    &:hover {
        background-color: ${colors.lightblue};
        cursor: pointer;
    }
`;
