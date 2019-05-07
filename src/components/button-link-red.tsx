import styled from "@emotion/styled"
import { ButtonLink } from "../components";
import { colors, radii } from "../constants";

export const ButtonLinkRed = styled(ButtonLink)`
    background-color: ${colors.white};
    border: 2px solid darkGreen;
    color: ${colors.black};
    border-radius: ${radii[1]};
    &:hover {
        background-color: grass;
        border: 2px solid;
        color: ${colors.white};
    }
`;
