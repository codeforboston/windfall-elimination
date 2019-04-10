import styled from "@emotion/styled";
import { breakPoints, spacing } from "../constants";

export const PrescreenInfo = styled("main")`
    max-width: ${breakPoints[3]};
    h3 {
        margin: 0 0 -${spacing[2]} 0;
        padding-bottom: ${spacing[0]};
        text-align: left;
    }
`;
