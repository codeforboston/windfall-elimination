import styled from "@emotion/styled";
import { colors } from "../constants";

export const HamburgerLines = styled("span")`
  background-color: ${colors.red};
  &:hover {
    background-color: ${colors.lightred};
  }
`;
