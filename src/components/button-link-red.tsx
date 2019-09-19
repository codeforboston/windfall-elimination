import styled from "@emotion/styled";
import { ButtonLink } from "../components";
import { colors } from "../constants";

export const ButtonLinkRed = styled(ButtonLink)`
  background-color: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.lightBlue};
  &:hover {
    background-color: ${colors.darkBlue};
    border-color: ${colors.lightBlue};
    color: ${colors.white};
    cursor: pointer;
    box-shadow: 0px -1px 15px ${colors.gray};
  }
`;
