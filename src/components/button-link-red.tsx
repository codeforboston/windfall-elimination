import styled from "@emotion/styled";
import { ButtonLink } from "../components";
import { colors } from "../constants";

export const ButtonLinkRed = styled(ButtonLink)`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 2px solid ${colors.lime};
    &:hover {
        border-color: ${colors.lime};
        background-color: ${colors.lime};
        color: ${colors.white}
    }
`;
