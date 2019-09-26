import styled from "@emotion/styled";
import { colors } from "../constants";

export const RadioButton = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.lightblue};
  height: 50px;
  width: 50px;
  font-size: 50px;
  border-radius: 25px;
`;

