import React from "react";
import { spacing, colors, fontSizes, radii } from "../constants";
import DatePicker from "react-datepicker";
import styled from "@emotion/styled";

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const StyledDatePicker = styled(DatePicker)`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 25px;
  min-width: 230px;
  border-radius: 3px;
`;
