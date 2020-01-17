import React from "react";
import styled from "@emotion/styled";
import {
  TextBlock,
  H3,
  PrintButton
} from "../components";

const AboutContainer = styled.div`
  display: block;
`;


export default () => (
  <AboutContainer>
    <H3>Social Security told me I had an overpayment. What do I do?</H3>
    <TextBlock>
    An overpayment is when Social Security believes they paid you
     benefits you were not eligible for, or paid you more money 
     than you were entitled. When you receive a notice of overpayment,
      you have two options:
    </TextBlock>
    <TextBlock>
      <ul><li>If you believe that Social Security is incorrect about
         the overpayment, or you do not understand how they calculated
          the overpayment, you can appeal.
        </li>
        <li>If you believe that Social Security is correct about the
           overpayment but you do not believe it was your fault and 
           you are unable to pay the money back, you can apply for
           a waiver.
        </li>
      </ul>
      </TextBlock>

    <TextBlock>
      You can appeal or request a waiver by calling Social Security
       or visiting your local field office. Make sure to have your
        Social Security number and the results from this app printed
         when you make an appointment. Find your 
         <a href="https://www.ssa.gov/locator/">local field office 
         here</a> or call <a href="tel:1-800-772-1213">1-800-772-1213</a>.
    </TextBlock>

    <H3>This result doesn’t match what Social Security told me.</H3>
    <TextBlock>
    <p>There are a few reasons why this may be happening: first,
     click on ‘earnings’ at left to make sure that the earnings 
     record and pension amount you uploaded is correct.</p>
     <p>
    If you believe that Social Security has an error in your earnings record,
     you should contact Social Security and bring evidence of your earnings
      record to have them correct the error.</p>
    <p>
    Your results may also be affected by the Government Pension Offset,
     or another Social Security rule not covered by this calculator.
     </p>
    </TextBlock>
    <TextBlock>
    As above, if you have a question about how your Social Security 
    benefits are being calculated, you should contact Social Security
     and ask that they assist you in understanding your benefits.
      If you have any trouble contacting Social Security, reach out 
      to your Member of Congress for help (see below).
    </TextBlock>

  <H3>I&apos;d like to see WEP repealed. What do I do?</H3>
  <TextBlock>
  Congress has introduced several bills to repeal WEP since it
   was first made law in the 1980s. However, none have passed.
   &nbsp;<a href="https://www.house.gov/representatives/find-your-representative">Contact your representative in Congress here</a>.
  </TextBlock>
	 <br></br>

  </AboutContainer>

);
