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
      If you worked in a job that did not pay Social Security taxes, you may be affected by the Windfall Elimination Provision (WEP). WEP is a Social Security rule which may reduce your Social Security retirement benefits by up to 50%.
    </TextBlock>

    <TextBlockHeader>Who is affected?</TextBlockHeader>
    <TextBlock>
      People who worked in state and local government in Massachusetts, Kentucky, Ohio, Indiana, and Texas are most likely to be affected. Continue to see how your retirement benefits will be impacted by WEP.
    </TextBlock>

    <TextBlock>
      This site is for informational purposes only, and should not be taken as
      legal, tax, investment, financial, or other advice. You should consult
      with a financial advisor or attorney to determine what is best for your
      individual circumstances. Congressman Moulton's office and Code for Boston
      may not be held liable for damages arising from any decision you make
      based on the information on this site. Please note that the SSA updates
      the formulas used to calculate benefit amounts yearly. Therefore, it is
      likely that your benefit estimates in the future will differ from those
      calculated today.
    </TextBlock>
    <LinkWrapper>
      <ButtonLink to="/prescreen-1/">Get Started</ButtonLink>
    </LinkWrapper>
  </>
);
