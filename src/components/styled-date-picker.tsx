import styled from "@emotion/styled";
import { spacing, colors, fontSizes, radii } from "../constants";
import DatePicker from "react-date-picker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const StyledDatePicker = styled(DatePicker)`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 25px;
  min-width: 230px;
  border-radius: 3px;
`;
