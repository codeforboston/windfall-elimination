import styled from "@emotion/styled"
import { ButtonLink } from "../components";
import { colors } from "../constants";

export const ButtonLinkRed = styled(ButtonLink)`
    background-color: ${colors.red};
    &:hover {
        background-color: ${colors.lightred};
    }
`;
