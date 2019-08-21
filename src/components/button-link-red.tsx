import styled from "@emotion/styled";
import { ButtonLink } from "../components";
import { colors } from "../constants";

export const ButtonLinkRed = styled(ButtonLink)`
  background-color: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.lightBlue};
  &:hover {
    border-color: ${colors.lightBlue};
    background-color: ${colors.lightBlue};
    color: ${colors.white};
  }
`;
