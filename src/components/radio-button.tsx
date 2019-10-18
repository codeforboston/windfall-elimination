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

export const AnswerBox = styled.div`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 30px;
  width: 250px;
  border-radius: 3px;
  padding: 5px;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const AnswerInput = styled.input`
  border: 2px solid ${colors.purple};
  height: 50px;
  width: 200px;
  border-radius: 3px;
  display: flex;
  margin: 10px 0;
  padding: 0 10px;
  font-size: 18px;
  font-family: 'Montserrat',sans-serif;
`;