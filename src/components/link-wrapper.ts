import styled from "@emotion/styled";
import { spacing } from "../constants";

type Props = {
    width?: string;
};

export const LinkWrapper = styled("div")<Props>`
    display: grid;
    justify-self: center;
    justify-content: center;
    width: ${props => props.width ? props.width : "300px"};
    gap: ${spacing[1]};
`;
