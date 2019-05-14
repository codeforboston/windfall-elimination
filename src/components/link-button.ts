import styled from "@emotion/styled";
import { Link } from "gatsby";
import { spacing, colors, fontSizes, radii } from "../constants";

export const LinkButton = styled(Link)`
    padding: ${spacing[0]} ${spacing[0]};
    margin: ${spacing[0]} ${spacing[0]};
    height: 30px;
    background-color: ${colors.blue};
    font-size: ${fontSizes[0]};
    border-radius: ${radii[0]};
    color: ${colors.white};
    text-decoration: none;
    &:hover {
        background-color: ${colors.lightblue};
        cursor: pointer;
    }
`;