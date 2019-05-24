import React, { Component } from "react";
import { Link } from "gatsby";
import {
  LinkWrapper,
  SEO,
  ButtonLink,
  TextBlockHeader,
  TextBlock,
  ListItem,
  UnorderedList,
  HamburgerHelper
} from "../components";

export default () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <TextBlockHeader>
      What is the Windfall Elimination Provision?
    </TextBlockHeader>
    <TextBlock>
      The Windfall Elimination Provision is a policy intended to reduce Social
      Security benefits for people who also have access to a pension or
      retirement account from work where they did not pay into Social Security.
    </TextBlock>

    <TextBlockHeader>Will I be affected by WEP?</TextBlockHeader>
    <TextBlock>
      <UnorderedList>
        <ListItem>
          <strong>Government workers:</strong> Most jobs that do not pay into
          social security are jobs with state and local government. This means
          that the majority of affected people are teachers, firefighters, city
          hall employees, janitors, and other public servants.
        </ListItem>
        <ListItem>
          <strong>State of residence:</strong> For some states (including
          Massachusetts, Kentucky, Ohio, Indiana, and Texas), the majority of
          state and local employees will be affected by WEP. In the majority of
          the other states, some but not all retirees will be affected.
        </ListItem>
      </UnorderedList>
    </TextBlock>

        <TextBlockHeader>Why is this app useful?</TextBlockHeader>
        <TextBlock>
            While the Social Security administration provides some information on how WEP is calculated, this information is often difficult to find and understand.
        </TextBlock>
        <TextBlock>
            This site is for informational purposes only, and should not be taken as legal, tax, investment, financial, or other advice. You should consult with a financial advisor or attorney to determine what is best for your individual circumstances. Congressman Moulton's office and Code for Boston may not be held liable for damages arising from any decision you make based on the information on this site.

            Please note that the SSA updates the formulas used to calculate benefit amounts yearly. Therefore, it is likely that your benefit estimates in the future will differ from those calculated today.
        </TextBlock>
        <LinkWrapper>
            <ButtonLink to="/prescreen-1/">Get Started!</ButtonLink>
        </LinkWrapper>
    </>
)
