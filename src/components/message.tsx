import styled from "@emotion/styled";
import { Card } from "../components";
import { colors, fonts, fontSizes } from "../constants";

export const Message = styled(Card)`
  background-color: ${colors.whiteSmoke};
  color: ${colors.black};
  font-size: ${fontSizes[1]};
`;
