import styled from "@emotion/styled";
import { breakPoints, fontSizes, spacing } from "../constants";

export const TextBlockCenter = styled("div")`
    text-align: justify;
    font-size: ${fontSizes[1]};
    max-width: ${breakPoints[3]};
    margin: 0 auto ${spacing[2]};
`;
