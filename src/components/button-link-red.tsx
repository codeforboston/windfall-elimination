import styled from "@emotion/styled";
import { ButtonLink } from "../components";
import { colors } from "../constants";

export const ButtonLinkRed = styled(ButtonLink)`
  background-color: ${colors.lime};
  color: ${colors.white};
  &:hover {
    background-color: ${colors.lime};
  }
`;
