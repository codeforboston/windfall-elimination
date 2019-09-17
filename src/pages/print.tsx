import React from "react";
import {
  PrintButton,
  ButtonLinkRed,
  TextBlock,
  SEO,
  UnorderedList,
  ListItem,
  TextBlockHeader,
  Message,
  HelperText,
  Card,
  ObservableCell
} from "../components";

const unquotedObserverFn = function (name) {
            return {fulfilled: (value) => {
                const node = document.getElementById(name);
                if (node !== null) {
                    node.innerHTML = value;
                    return true;
                } else {
                    return false;
                }
                }
            }
            
        }

export default class Print extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.printPage = this.printPage.bind(this);
  }

  printPage() {
     var printContents = document.getElementById("printArea").innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
  }

  render() {

    return(
      <>
          <div id="printArea">
          <h2>Your Results</h2>
          <Card>
              <div>Windfall Elimination Maximum Payable Benefit calculated: </div>
              <div>$<ObservableCell cellname='wepMPB'  customObserver={unquotedObserverFn}/> per month</div>
              <label>
                  Your Averaged Indexed Monthly Earnings (AIME): 
                  <div><ObservableCell cellname='AIMEPicked'/></div>
              </label>
              <label>
                  Years of substantial earnings: <div><ObservableCell cellname='yearsSubstantialEarningsPicked' /></div>
              </label>
              <label>
                  Your monthly pension amount: <div><ObservableCell cellname='pensionNonCoveredMonthly' /></div>
              </label>
          </Card>
          <Message>
          <label>
              WEP calculated values
                  <HelperText>If you were NOT affected by the Windfall Elimination Provision, and retired at Full Retirement Age, your benefits would be: </HelperText>
                  <strong><code>$<ObservableCell cellname='standardPIA' customObserver={unquotedObserverFn} /> per month</code></strong>
                  <HelperText>However, because you are affected by the Windfall Elimination Provision, if you retire at Full Retirement Age, your monthly benefits will be: </HelperText>
                  <strong><code>$<ObservableCell cellname='wepPIA' customObserver={unquotedObserverFn}/> per month</code></strong>
                  <HelperText>This is a difference of: </HelperText>
                  <strong><code>$<ObservableCell cellname='wepDifference' customObserver={unquotedObserverFn}/> per month</code></strong>
           </label>
          </Message>
          <Card>
            NOTE: The Social Security Administration allows you to start taking retirement benefits any time between age 62 and age 70. If you retire before your Full Retirement Age, 
            the Social Security Administration reduces your benefit. 
            If you retire after your Full Retirement Age, the Social Security Administration increases your benefit.
          </Card>
        </div>
        <ButtonLinkRed to="/screen-2/">Go back!</ButtonLinkRed>
        <PrintButton onClick={this.printPage}>Print Results</PrintButton>
      </>
    )
  }
}