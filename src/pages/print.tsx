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
import { SessionStore } from "../library/session-store";
import styled from "@emotion/styled";
import { colors, fonts, fontSizes, radii, spacing } from "../constants";

export const BoxDisplay = styled('div')`
  background-color: ${colors.whiteSmoke};
  color: ${colors.black};
  font-size: ${fontSizes[1]};
  line-height: 50px;
  text-align: center;
  width: 150px;
  height: 50px;
  grid-column-start: 2; 
  grid-column-end: 3; 
  justify-self: center;
  align-self: end;
  margin: 5px;
`;

export const ResultsCard = styled('div')`
  border: 1px solid ${colors.darkGreen};
  border-radius: ${radii[0]};
  padding: ${spacing[1]};
  margin: ${spacing[1]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-auto-rows: 1fr;
`;

export const DisplayTable = styled("table")`
  table-layout: fixed;
  border-radius: ${radii[0]};
  margin: ${spacing[0]};
  padding: 8px;
  margin: auto;
`;

export const TableHeader = styled("th")`
  background-color: #dddddd;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

export const TableRow= styled("tr")`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
`;


var title = {
  gridColumnStart: 1,
  gridColumnEnd: 3,
  gridRowStart: 1,
  gridRowEnd: 2,
  justifySelf: 'center'
};

var field1 = {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 2,
  gridRowEnd: 3,
  alignSelf: 'center',
};

var field2 = {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 3,
  gridRowEnd: 4,
  alignSelf: 'center',
};

var field3 = {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 4,
  gridRowEnd: 5,
  alignSelf: 'center',
};

var field4 = {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 5,
  gridRowEnd: 6,
  justifySelf: 'center',
  alignSelf: 'center',
};

var earningsField = {
  gridColumnStart: 1,
  gridColumnEnd: 3,
  gridRowStart: 2,
  gridRowEnd: 6
};

var blankLines = {
  gridColumnStart: 2,
  gridColumnEnd: 3,
  alignSelf: 'end',
  justifySelf: 'center',
  marginBottom: '20px'
};

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

export class PrintEarnings extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      tableRows: undefined
    }
  }

  componentDidMount() {
    this.earningsRecord = JSON.parse(SessionStore.get('earnings'))
    if (this.state.tableRows === undefined) {
      this.makeRows()
    }
  }

  makeRows() {
    const earnings = this.earningsRecord['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'];
    var testEarnings = earnings
    var earningsDict = {};
    var tablesize = Math.ceil(earnings.length / 10)
    var tableHeader = <><TableHeader>Year</TableHeader ><TableHeader>Amount</TableHeader></>;
    var newRows = earnings.map((earning, i) => {
      return(
        <>
          <td><label>{earning['@_startYear']}</label></td>
          <td><label id={earning['@_startYear']} >{earning['osss:FicaEarnings']}</label></td>
        </>
      )
    })

    if (tablesize >= 5) {
      var tablesize = Math.ceil(earnings.length / 10)
      this.headers = Array(tablesize).fill(tableHeader)
      var columnLength = 10;

    } else {
       this.headers = Array(tablesize).fill(tableHeader)
       var columnLength = 10;
    }

    var sizedRows = []

    while (newRows.length > 0)
      if (newRows.length > columnLength) {
        sizedRows.push(newRows.splice(0, columnLength))
      } else {
        var remLength = columnLength - newRows.length
        var smallArr = newRows.splice(0, newRows.length)
        for (var i=0; i < remLength; i++) {
          smallArr.push(<></>)
        }
        sizedRows.push(smallArr)
        
      }

    var finalRows = sizedRows[0].map(function(record, index) {
      var restofArray = sizedRows.slice(1, sizedRows.length)
      var len = restofArray.length
      var finalRecord = []
      finalRecord.push(record)

      for (var i=0; i < len; i++) {
        finalRecord.push(restofArray[i][index])
      };

      var completeRow = <TableRow>{finalRecord}</TableRow>

      return completeRow
    });

    this.setState({
      tableRows: finalRows
    })
  }

  render() {
    return(
        <DisplayTable>
          <tbody>
            <tr>{this.headers}</tr>
            {this.state.tableRows}
          </tbody>
        </DisplayTable>
    )
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
          <h1>Retirement benefit factors</h1>
          <Message>
            <div>Please review the information below for accuracy. If the information you provided does not match
            your letters from the Social Security Administration, you may want to consider contacting your local
            Social Security office. Bring this sheet and any supporting evidence (for example, W-2's, pension 
            fund statements) with you.</div>

            <div>To find your local Social Security Office, please call the Social Security Administration at
            1-800-772-1213 or go to https://secure.ssa.gov/ICON/main.jsp.</div>
          </Message>
          <ResultsCard>
            <h3 style={title}>Beneficiary Information</h3>
            
            <div style={field1}>Name:</div><div style={blankLines}>____________________________</div>

            <div style={field2}>Social Security Number: </div><div style={blankLines}>______-______-_________</div>

            <div style={field3}>Date of Birth: </div><BoxDisplay><ObservableCell cellname='birthDatePicked'/></BoxDisplay>

          </ResultsCard>
          <ResultsCard>
            <h3 style={title}>Retirement information</h3>
            
            <div style={field1}>Monthly non-covered pension amount:</div><BoxDisplay><ObservableCell cellname='retireDatePicked'/></BoxDisplay>

            <div style={field2}>Date of Full Retirement Age:</div><BoxDisplay><ObservableCell cellname='pensionNonCoveredMonthly'/></BoxDisplay>
          </ResultsCard>
          <Card>
            <h3 style={{textAlign: 'center'}}>Earnings Record</h3>
            <div><PrintEarnings /></div>
          </Card>
          <ResultsCard>
              <h3 style={title}>Calculation results</h3>

              <div style={field1}>Average Indexed Monthly Earnings:</div><BoxDisplay><ObservableCell cellname='AIMEPicked'/></BoxDisplay>

              <div style={field2}>Years of Substantial Earnings:</div><BoxDisplay><ObservableCell cellname='yearsSubstantialEarningsPicked'/></BoxDisplay>

              <div style={field3}>Primary Insurance Amount:</div><BoxDisplay><strong><code>$<ObservableCell cellname='wepPIA' customObserver={unquotedObserverFn}/> per month</code></strong></BoxDisplay>

              <div style={field4}>Maximum Payable Benefit at Full Retirement Age:</div><BoxDisplay><strong><code>$<ObservableCell cellname='wepMPB'  customObserver={unquotedObserverFn}/> per month</code></strong></BoxDisplay>
          </ResultsCard>
        </div>
        <ButtonLinkRed to="/screen-2/">Go back!</ButtonLinkRed>
        <PrintButton onClick={this.printPage}>Print Results</PrintButton>
      </>
    )
  }
}