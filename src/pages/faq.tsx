import React from 'react';
import styled from '@emotion/styled';
import { TextBlock, H3, PrintButton } from '../components';

const AboutContainer = styled.div`
  display: block;
`;

export default () => (
  <AboutContainer>
    <H3>Social Security told me I had an overpayment. What do I do?</H3>
    <TextBlock>
      An overpayment is when Social Security believes they paid you benefits you
      were not eligible for, or paid you more money than you were entitled. When
      you receive a notice of overpayment, you have two options:
    </TextBlock>
    <TextBlock>
      <ul>
        <li>
          If you believe that Social Security is incorrect about the
          overpayment, or you do not understand how they calculated the
          overpayment, you can appeal.
        </li>
        <li>
          If you believe that Social Security is correct about the overpayment
          but you do not believe it was your fault and you are unable to pay the
          money back, you can apply for a waiver.
        </li>
      </ul>
    </TextBlock>

    <TextBlock>
      You can appeal or request a waiver by calling Social Security or by visiting
      your local field office. Make sure to have your Social Security number and
      the results from this app printed when you make an appointment. Find your{' '}
      <a href="https://www.ssa.gov/locator/">local field office here</a> or call{' '}
      <a href="tel:1-800-772-1213">1-800-772-1213</a>.
    </TextBlock>

    <H3>This result doesn’t match what Social Security told me.</H3>
    <TextBlock>
      <p>
        There are a few reasons why this may be happening: first, click on
        ‘earnings’ at left to make sure that the earnings record and pension
        amount you uploaded is correct.
      </p>
      <p>
        If you believe that Social Security has an error in your earnings
        record, you should contact Social Security and bring evidence of your
        earnings record to have them correct the error.
      </p>
      <p>
        Your results may also be affected by the Government Pension Offset, or
        another Social Security rule not covered by this calculator.
      </p>
    </TextBlock>
    <TextBlock>
      As above, if you have a question about how your Social Security benefits
      are being calculated, you should contact Social Security and ask that they
      assist you in understanding your benefits. If you have any trouble
      contacting Social Security, reach out to your Member of Congress for help
      (see below).
    </TextBlock>
    <H3>What is the Windfall Elimination Provision (WEP) and how does it affect 
      government workers like teachers or firefighters?</H3>
  <TextBlock>
  <p>WEP is a complicated provision that alters benefits of retirees who spent some
   part of their career not paying into social security, often working for state
   or local government.</p>
  <p>Along with the somewhat simpler GPO (Government Pension Offset)
   rules, they can often catch retirees in Massachusetts and 7-10 other states
   off guard. This calculator aims to improve the experience for these and other
   retirees in the United States.</p>

   &nbsp;<a href="http://www.massretirees.com/wepgpo-explained">Read more at Mass Retirees</a>.
  </TextBlock>
	 <br></br>

   <H3>What is the Detailed Calculator or AnyPIA-JS?</H3>
    <TextBlock>
      <p>
      Written and maintained since the early 2000s, the official Social Security Administration's <a href="https://www.ssa.gov/OACT/anypia/anypia.html">Detailed Calculator</a> is a comprehensive benefit calculator which is designed to compute historical benefits as well as estimate future benefits.
      </p>
      <p>
      For short, it is known as AnyPIA.exe in Windows.
      </p>
      <p>
      The Windfall project's own calculator could not determine future benefit 
      for people more than a year or so away
       from retirement eligible age—62 years old. That calculation requires 
       synthesizing predictions from the annual Social Security Trustee report,
        locating details such as: anticipated economic trends, changes in the
         trust fund, and adjustments in cost of living.
            </p>
    </TextBlock>
    <TextBlock>
    Rather than maintain these details, we decided our efforts were best spent
     on extending the existing AnyPIA Windows tool to work as a browser-based 
     tool as well. For this, 6 volunteers from Code for Boston and Congressman
      Seth Moulton's caseworkers created AnyPIAJS in early/mid 2020.
    <p><img alt="Screenshot of the Windows version of AnyPIA" 
    src="https://user-images.githubusercontent.com/283343/94048036-e8c46080-fda0-11ea-907b-2a3f295a2976.png"
     height="300" /></p>
    <p>Screenshot of original desktop Windows version of AnyPIA.</p>
    <p>The <a href="https://www.ssa.gov/myaccount/">My SocialSecurity.gov</a> website allows
       Social Security card holders to download all their earnings records at 
       once, as a PDF or XML file. The information is sourced from the card 
       holder's tax filings. One challenge for card holders who want to plan 
       ahead for their retirement is that the current AnyPIA Detailed Calculator
        can only load an old format called ".pia", but it cannot load either the XML or the PDF file. 
        This means that the best tools for planners are out of sync with each other.
         Basically, with existing official tools, retirees always have to track
          down and manually type in their entire career earnings.</p>
    <p> To solve this problem Code for Boston volunteers and Congressman Seth
       Moulton's office case workers built AnyPIA-JS. It can do the best 
       calculations and take the card holders' most convenient data, so that 
       they can get the most accurate benefits calculation. We also provide
        other helpful contextual information from caseworkers's interviews with
         300 constituents.  </p>
    </TextBlock>
	 <br></br>
   

    <H3>I&apos;d like to see WEP repealed. What do I do?</H3>
    <TextBlock>
      Congress has introduced several bills to repeal WEP since it was first
      made law in the 1980s. However, none have passed.&nbsp;
      <a href="https://www.house.gov/representatives/find-your-representative">
        Contact your representative in Congress here
      </a>
      .
    </TextBlock>
    <br></br>
  </AboutContainer>
);
