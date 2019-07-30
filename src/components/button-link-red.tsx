import styled from "@emotion/styled";
import { ButtonLink } from "../components";
import { colors } from "../constants";

export const ButtonLinkRed = styled(ButtonLink)`
  background-color: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.lightblue};
  &:hover {
    border-color: ${colors.lightblue};
    background-color: ${colors.lightblue};
    color: ${colors.white};
  }
`;
