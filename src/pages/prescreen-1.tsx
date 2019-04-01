import React from "react"
import { ButtonLink, TextBlock, SEO } from "../components";

const PreScreen1 = () => (
    <>
        <SEO title="Prescreen" keywords={[`gatsby`, `application`, `react`]} />
        <h2>Pre-Screen</h2>
        <TextBlock>
            The Windfall Elimination Provision is a policy intended to reduce Social Security benefits for people who also have access to a pension or retirement account from work where they did not pay into Social Security.
        </TextBlock>
        <TextBlock>
            Most jobs that do not pay into social security are jobs with state and local government
            For six states (including Massachusetts, Kentucky, Ohio, Indiana, Texas, and more), the majority of state and local employees will be affected by WEP; however, for 26 other states, (including XYZ), some but not all retirees will be affected. This means that the majority of affected people are teachers, firefighters, city hall employees, janitors, and other public servants. While the Social Security administration provides some information on how WEP is calculated, this information is often difficult to find and harder to understand.
        </TextBlock>
        <TextBlock>
            On Congressman Moulton’s constituent services team, we believe that government should be easy to use, easy to access, and easy to understand. This is why we teamed up with Code for Boston to help retirees and their families understand how the Windfall Elimination Provision formula works, predict the amount of their retirement benefits, and effectively advocate for themselves with the Social Security Administration.
        </TextBlock>
        <TextBlock>
            This app will walk you through how the formula works, and help you estimate how WEP will affect you when you retire. It will also give you some starting points to take political action, handle an overpayment, or help other people understand how WEP will affect them.
        </TextBlock>
        <TextBlock>
            It will not ask you for any information that could put your identity at risk. This app will also not store your data, although you can save or print out your results at the end.
        </TextBlock>
        <TextBlock>
            [LEGAL DISCLAIMER]
        </TextBlock>
        <TextBlock>
            Click below to start.
        </TextBlock>
        <ButtonLink to="/prescreen-1b/">Start</ButtonLink>
    </>
)

export default PreScreen1;
