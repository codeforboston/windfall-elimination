import React from "react"
import { ButtonLink, ButtonLinkRed, TextBlock, SEO, UnorderedList, ListItem, TextBlockHeader } from "../components";

export default () => (
    <>
        <SEO title="Prescreen 1" keywords={[`gatsby`, `application`, `react`]} />
        <h2>Pre-Screen</h2>

        <TextBlock>
            This app will walk you through how the formula works, and help you
            estimate how WEP will affect you when you retire. It will also give
            you some starting points to take political action, handle an overpayment,
            or help other people understand how WEP will affect them.
        </TextBlock>
        <TextBlock>
            Click below to start.
        </TextBlock>
        <ButtonLinkRed to="/">Go back!</ButtonLinkRed>
        <ButtonLink to="/prescreen-1b/">Start</ButtonLink>
    </>
)
