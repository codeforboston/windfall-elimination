import React from "react"
import { ButtonLink, ButtonLinkRed, TextBlock, SEO, PrescreenInfo, Card } from "../components";

export default () => (
    <PrescreenInfo>
        <SEO title="Prescreen 1" keywords={[`gatsby`, `application`, `react`]} />
        <h2>Pre-Screen</h2>

        <h3>What is the Windfall Elemination Provision?</h3>
        <TextBlock>
            The Windfall Elimination Provision is a policy intended to reduce Social Security benefits for people who also have access to a pension or retirement account from work where they did not pay into Social Security.
        </TextBlock>

        <h3>Will I be affected by WEP?</h3>
        <TextBlock>
            <ul>
                <li><strong>Government workers:</strong> Most jobs that do not pay into social security are jobs with state and local government. This means that the majority of affected people are teachers, firefighters, city hall employees, janitors, and other public servants.</li>
                <li><strong>State of residence:</strong> For some states (including Massachusetts, Kentucky, Ohio, Indiana, and Texas), the majority of state and local employees will be affected by WEP. In the majority of the other states, some but not all retirees will be affected.</li>
            </ul>
        </TextBlock>

        <h3>Why is this app useful?</h3>
        <TextBlock>
            While the Social Security administration provides some information on how WEP is calculated, this information is often difficult to find and understand.
        </TextBlock>

        <h3>How did this project come about?</h3>
        <TextBlock>
            On Congressman Moulton’s constituent services team, we believe that government should be easy to use, easy to access, and easy to understand. This is why we teamed up with Code for Boston to help retirees and their families understand how the Windfall Elimination Provision formula works, predict the amount of their retirement benefits, and effectively advocate for themselves with the Social Security Administration.
        </TextBlock>

        <Card>
            <TextBlock>
                This app will walk you through how the formula works, and help you estimate how WEP will affect you when you retire. It will also give you some starting points to take political action, handle an overpayment, or help other people understand how WEP will affect them.
            </TextBlock>
            <TextBlock>
                It will not ask you for any information that could put your identity at risk. This app will also not store your data, although you can save or print out your results at the end.
            </TextBlock>
            <TextBlock>
                [LEGAL DISCLAIMER]
            </TextBlock>
        </Card>

        <TextBlock>
            Click below to start.
        </TextBlock>
        <ButtonLinkRed to="/">Go back!</ButtonLinkRed>
        <ButtonLink to="/prescreen-1b/">Start</ButtonLink>
    </PrescreenInfo>
)
