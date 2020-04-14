import styled from "@emotion/styled";
import { colors, fontSizes } from "../constants";

export const WarningBox = styled.div`
  border-left: 3px solid ${colors.red};
  background-color: #ffe6e6;
  padding: 10px;
  margin-top: 25px;
  @media (max-width: 767px) {
    font-size: ${fontSizes[2]};
  }
`;