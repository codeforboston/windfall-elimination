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
    border: 3px solid ${colors.white};
    border-radius: 100px;
    color: ${colors.white};
    background-color: ${colors.purple};

    &:after {
      content: ' ';
      height: 15px;
      width: 10px;
      background-color: #fff;
      padding-left: 5px;
      margin-left: 7.5px;
      border: 2px solid #FFF;
      border-radius: 100px;
      margin-top: 7.5px;
      display: inline-block;
   }
  }

`;
