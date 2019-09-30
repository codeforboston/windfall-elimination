import styled from "@emotion/styled";
import { colors } from "../constants";

export const RadioButton = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.lightblue};
  height: 40px;
  width: 40px;
  font-size: 30px;
  border-radius: 25px;
  background-color: #eee;
  border-radius: 50%;

  &:checked {
    border: 13px solid ${colors.purple};
    border-radius: 100px;
    color: ${colors.white};
    background-color: ${colors.white};
  }
`;

