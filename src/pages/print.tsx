import React from "react";
import {
  PrintButton,
  Message,
  H3,
  H2
} from "../components";
import {useUserState, UserState, EarningsRecord} from '../library/user-state-context'
import styled from "@emotion/styled";
import { colors, fontSizes, radii, spacing } from "../constants";

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
  margin: ${spacing[1]} 0;
  display: block;
  flex-direction: row;
  padding: 10px 25px;
  @media (max-width: 768px) {
    padding: 10px 15px;
    margin: 5px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60vw;
  @media (max-width: 768px) {
    width: 70vw;
  }
`;

const PrintArea = styled.div`
display: block;
`;

var blankLines = {
  gridColumnStart: 2,
  gridColumnEnd: 3,
  alignSelf: 'end',
  justifySelf: 'center',
  marginBottom: '20px'
};

interface PrintEarningsProps {
  earnings: EarningsRecord
}

class PrintEarnings extends React.Component<PrintEarningsProps> {
  constructor(props, context) {
    super(props, context)
    this.state = {
      tableRows: undefined
    }
  }

  componentDidMount() {
    if (this.state.tableRows === undefined) {
      this.makeRows()
    }
  }

  makeRows() {
    const {earnings} = this.props
    var testEarnings = earnings;
    var earningsDict = {};
    var tablesize = Math.ceil(Object.keys(earnings).length / 10);
    var columnLength = 10;
    var newRows = Object.keys(earnings).map((year, i) => {
      return(
        <React.Fragment key={"earning" + i}>
          <td key={"earningYear" + i}><label>{year}</label></td>
          <td key={"earningAmount" + i}><label id={year} >{earnings[year]}</label></td>
        </React.Fragment>
      )
    })

    if (tablesize >= 5) {
      tablesize = Math.ceil(Object.keys(earnings).length / 15)
      columnLength = 15;

    }

    this.headers = Array(tablesize).fill(null).map((header, index) => {
        return(
          <React.Fragment key={"header" + index}>
            <TableHeader>Year</TableHeader ><TableHeader>Amount</TableHeader>
          </React.Fragment>
          )
      })

    var sizedRows = []

    while (newRows.length > 0) {
      if (newRows.length > columnLength) {
        sizedRows.push(newRows.splice(0, columnLength))
      } else {
        var remLength = columnLength - newRows.length
        var smallArr = newRows.splice(0, newRows.length)
        for (var i=0; i < remLength; i++) {
          smallArr.push(<React.Fragment key={"Filler" + i}></React.Fragment>)
        }
        sizedRows.push(smallArr)
      }
    }

    var finalRows = sizedRows[0].map(function(record, index) {
      var restofArray = sizedRows.slice(1, sizedRows.length)
      var len = restofArray.length
      var finalRecord = []
      finalRecord.push(record)

      for (var i=0; i < len; i++) {
        finalRecord.push(restofArray[i][index])
      };

      var completeRow = <TableRow key={"row" + index}>{finalRecord}</TableRow>

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

interface PrintProps {
  userState: UserState
}

class Print extends React.Component<PrintProps> {
  printPage = () => {
    var printContents = document.getElementById("printArea").innerHTML;
    var originalContents = document.body.innerHTML;

    // TODO Dangerous with React
    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  render() {
    const {userState: {earnings, userProfile, birthDate, retireDate}} = this.props

    if (!userProfile) return null

    const userAIME = userProfile['RawData']['AIMEPicked']
    const userYSE = userProfile['RawData']['yearsSubstantialEarningsPicked']
    const userPension = userProfile["RawData"]["pensionNonCoveredMonthly"]
    const userStandardPIA = userProfile["Standard PIA"]
    const userMPB = userProfile["MPB"]
    return(
      <PageContainer>
        <PrintArea id="printArea">
          <H2>Retirement benefit factors</H2>
          <Message>
            Please review the information below for accuracy. If the information you provided does not match
            your letters from the Social Security Administration, you may want to consider contacting your local
            Social Security office. Bring this sheet and any supporting evidence (for example, W-2's, pension 
            fund statements) with you.
            <br/>
            <br/>

            To find your local Social Security Office, please call the Social Security Administration at
            1-800-772-1213 or go to https://secure.ssa.gov/ICON/main.jsp.
          </Message>
          <ResultsCard >
            <Title><H3>Beneficiary Information</H3></Title>
            <Row>Name: <div style={blankLines}>____________________________</div></Row>

            <Row>Social Security Number: <div style={blankLines}>______-______-_________</div></Row>

            {birthDate && (
              <Row>Date of Birth: <BoxDisplay><strong>{birthDate.toLocaleDateString('en-US')}</strong></BoxDisplay></Row>
            )}

          </ResultsCard>
          <ResultsCard>
          <Title><H3>Retirement information</H3></Title>
            <Row>Monthly non-covered pension amount:<BoxDisplay><strong>${userPension}</strong></BoxDisplay></Row>

            {retireDate && (
              <Row>Date of Full Retirement Age:<BoxDisplay><strong>{retireDate.toLocaleDateString('en-US')}</strong></BoxDisplay></Row>
            )}
          </ResultsCard>
          {earnings && (
            <ResultsCard>
              <Title><H3 >Earnings Record</H3></Title>
              <div><PrintEarnings earnings={earnings}/></div>
            </ResultsCard>
          )}
          <ResultsCard>
              <Title><H3>Calculation results</H3></Title>

              <Row>
                Average Indexed Monthly Earnings:
                <BoxDisplay>
                  <strong>{userAIME}</strong>
                </BoxDisplay>
              </Row>
              <Row>
                Years of Substantial Earnings:
                <BoxDisplay>
                  <strong>{userYSE}</strong>
                  </BoxDisplay>
                </Row>
              <Row>
                Primary Insurance Amount:
                <BoxDisplay>
                  <strong>${userStandardPIA}</strong>
                </BoxDisplay>
              </Row>
              <Row>
                Maximum Payable Benefit at Full Retirement Age:
                <BoxDisplay>
                  <strong>${userMPB}</strong>
                </BoxDisplay>
              </Row>
          </ResultsCard>
          </PrintArea>
        <PrintButton onClick={this.printPage}>PRINT RESULTS</PrintButton>
      </PageContainer>
    )
  }
}

export default function PrintWrapper(): JSX.Element {
  const userState = useUserState()
  return <Print userState={userState} />
}
