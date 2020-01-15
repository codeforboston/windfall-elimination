import React from "react";
import styled from "@emotion/styled";
import fastXml from "fast-xml-parser";
import pdfJS from "pdfjs-dist";
import { spacing, colors, fontSizes, radii } from "../constants";
import {  H2, Glossary } from "../components";
import { SessionStore } from "../library/session-store";
import { getRawEarnings } from "../library/observable-functions";

/*remove this if we ever support future calculation */
const supportDatesAfterToday = false;

//Upload page specific css/html
export const UploadButton = styled("div")`
  position: relative;
  margin: ${spacing[2]} ${spacing[0]};
  overflow: hidden;
  background-color: ${colors.white};
  font-size: ${fontSizes[1]};
  border-radius: 25px;
  border: 2px solid ${colors.black};
  color: ${colors.purple};
  text-decoration: none;
  display: block;
  text-align: center;
  width: 300px;
  &:hover {
    background-color: ${colors.lightBlue};
  }
`;

export const UploadInput = styled("input")`
  visibility: hidden;
  position: relative;
  width: 300px;
  height: 50px;
  z-index: 1;
`;

export const UploadLabel = styled("label")`
  position: absolute;
  font-size: ${fontSizes[1]};
  width: 300px;
  height: 50px;
  padding-top 13px;
  padding-bottom: 3px;
`;

export const DisplayTable = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: start;
  margin: 20px 0 20px 0;
  max-height: 1800px;
  max-width: 555px;
  padding-right: 10px;
`;

export const TableHeader = styled("th")`
  background-color: #dddddd;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

export const TableRow = styled("tr")`
  border: 1px solid #dddddd;
`;

export const TableInput = styled("input")`
  height: 45px;
  width: 150px;
  border-radius: 0 3px 3px 0;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  padding-left: 5px;
`;

export const YearLabel = styled("label")`
  background-color: #dddddd;
  font-weight: 800;
`;

export const InputField = styled.div`
  border-radius: 3px;
`;

export const TD = styled.div`
  border: 2px solid ${colors.gray};
  border-radius: 3px;
  display: flex;
  width: 240px;
  margin-right: 10px;
`;

export const LabelBox = styled.div`
  background-color: #dddddd;
  border-radius: 3px 0 0 3px;
  padding: 10px;
  width: 60px;
`;

//-------------------------------------------------

// Generates earning records table from uploaded XML file, XML parsing adapted from Amrutha
// If user uploads: use Amru's table logic
// If manual entering, use alternative table generation method.
export class GenerateTable extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var tableRows;
    var earningsSize;
    if (this.props.parsedXml && this.props.manual === false) {
      const parsedXml = this.props.parsedXml;
      var earningsYears = Object.keys(parsedXml);
      tableRows = earningsYears.map((year, i) => {
        const earningValueXML = parsedXml[year]
          ? { defaultValue: parsedXml[year] }
          : { placeholder: 0 };
        return (
          <React.Fragment key={"earning" + i}>
            <TD>
              <LabelBox>
                <YearLabel>{year}</YearLabel>
              </LabelBox>
              <TableInput
                id={year}
                {...earningValueXML}
                onChange={this.props.handleInputEarnings}
              />
            </TD>
          </React.Fragment>
        );
      });
      earningsSize = tableRows.length;
    } else if (this.props.manual) {
      tableRows = Object.keys(this.props.manualTable).map((year, key) => {
        const earningValue = this.props.manualTable[year]
          ? { defaultValue: this.props.manualTable[year] }
          : { placeholder: 0 };
        return (
          <React.Fragment key={"earning" + key}>
            <TD>
              <LabelBox>
                <YearLabel>{year}</YearLabel>
              </LabelBox>
              <TableInput
                type="text"
                id={"value_" + year + "_" + key}
                {...earningValue}
                onChange={this.props.handleManualEarnings}
                onBlur={this.props.handleSave}
                tabindex={parseInt(key, 10) + 1}
              ></TableInput>
            </TD>
          </React.Fragment>
        );
      });
      earningsSize = tableRows.length;
    }
    const displayFile=this.props.fileName ? "from " + this.props.fileName : ""

    return (
      <>
        {earningsSize && <H2>Year-by-year Earning Records</H2> &&
        <h3>{earningsSize} {earningsSize ? "rows" : ""} {displayFile}</h3>}
         
        <DisplayTable>{tableRows}</DisplayTable>       
      </>
    );
  }
}

export default class FileUpload extends React.Component {
  constructor(props, context) {
    super(props, context);

    //Make sure that the worker version matches package.json pdfjs-dist version.
    pdfJS.GlobalWorkerOptions.workerSrc =
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/build/pdf.worker.js";

    this.handleUpload = this.handleUpload.bind(this);
    this.handleXMLFile = this.handleXMLFile.bind(this);
    this.handlePDFFile = this.handlePDFFile.bind(this);
    this.handleInputEarnings = this.handleInputEarnings.bind(this);
    this.handleManualEarnings = this.handleManualEarnings.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.fileInput = React.createRef();

    this.state = {
      elementLoaded: false,
      earningsRecord: undefined,
      userBirthDate: undefined,
      userRetireDate: undefined,
      estimatedYears: [],
      rowValues: [],
      manualTable: {},
      displayTable: false,
      buttonText: this.props.manual
        ? "Enter Earnings Record"
        : "Upload Earnings Record",
      buttonFunction: this.props.manual ? this.handleEnter : this.handleUpload,
      buttonType: this.props.manual ? "button" : "file",
      saveDisable: false
    };
  }

  componentDidMount() {
    let earningsValue = {};
    if (SessionStore.get("earnings")) {
      earningsValue = JSON.parse(SessionStore.get("earnings"));
      this.setState({
        earningsRecord: earningsValue
      });
    }

    if (SessionStore.get("BirthDate") && SessionStore.get("RetireDate")) {
      var birthdate =
        new Date(JSON.parse(SessionStore.get("BirthDate"))).getFullYear() + 18;

      var retiredate = new Date(
        JSON.parse(SessionStore.get("RetireDate"))
      ).getFullYear();

      this.setState({
        userBirthDate: birthdate,
        userRetireDate: retiredate
      });
    }

    var tempTable = {};
    const yearCountForLoopLength = (!supportDatesAfterToday &&
       retiredate<= new Date().getFullYear()) ? retiredate : new Date().getFullYear() - 1
    if (birthdate !== undefined && retiredate !== undefined) {
      for (var i = birthdate; i <= yearCountForLoopLength; i++) {
        if (Object.keys(earningsValue).includes(String(i))) {
          tempTable[i] = earningsValue[i];
        } else {
          tempTable[i] = 0;
        }
      }
    }

    this.setState({
      manualTable: tempTable
    });
  }

  //For uploaded records: handles the updating of stored earnings record to match inputed value
  handleInputEarnings(input) {
    var earnings = this.state.earningsRecord;
    var earningsYears = Object.keys(earnings);
    var modifiedyear = input.target.id;

    if (earningsYears.includes(modifiedyear)) {
      earnings[modifiedyear] = Number(input.target.value);

      var earningsJSON = JSON.stringify(earnings);
      SessionStore.push("earnings", earningsJSON);

      this.setState({
        earningsRecord: earnings
      });
    }
  }

  //Parse XML file
  handleXMLFile(reader) {
    if (fastXml.validate(reader.target.result) === true) {
      var parsedText = fastXml.parse(reader.target.result, {
        ignoreAttributes: false
      });

      var earnings = getRawEarnings(parsedText['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'])

      var earningsJSON = JSON.stringify(earnings);
      SessionStore.push("earnings", earningsJSON);
      this.setState({
        earningsRecord: earnings
      });
    }
  }

  //Parse PDF file
  async handlePDFFile(reader) {
    //Returns first page of document
    var combinedValues = [];
    await pdfJS.getDocument(reader.target.result).promise.then(async ssaDoc => {
      var earningsPage;
      for (var page of Array(ssaDoc.numPages).keys()) {
        var docPage = ssaDoc.getPage(page + 1);
        await Promise.resolve(docPage)
          .then(pageContent => pageContent.getTextContent())
          .then(doc => {
            var textheader = doc.items.slice(0, 10);
            for (var text of textheader) {
              var textstr = text.str.replace(/ /g, "");
              if (textstr === "YourEarningsRecord") {
                earningsPage = doc;
                return;
              }
            }
          });
      }

      earningsPage.items.forEach(item => {
        var filter = Number(item.str.replace(",", "").replace(" ", ""));
        if (!Number.isNaN(filter)) {
          combinedValues.push(filter);
        }
      });
    });

    var currentRecord = {};
    do {
      var newvalue = combinedValues.shift();
      if (newvalue > 1900) {       
        currentRecord[newvalue] = combinedValues.shift();
        //This call is necessary for skipping medicare values.
        combinedValues.shift();
      }
    } while (combinedValues.length > 0);

    var earningsJSON = JSON.stringify(currentRecord);
    SessionStore.push("earnings", earningsJSON);
    this.setState({
      earningsRecord: currentRecord
    });
  }

  handleUpload(formResponse) {
    this.setState({
      displayTable: true,
      fileName: this.fileInput.current.files[0].name
    });
    formResponse.preventDefault();
    const file = this.fileInput.current.files[0];
    var name = this.fileInput.current.files[0].name;
    name = name.split(".");
    const extension = name[name.length - 1];
    var reader = new FileReader();

    switch (extension) {
      case "xml":
        reader.onload = reader => this.handleXMLFile(reader);
        reader.readAsText(file);
        break;

      case "pdf":
        reader.onload = reader => this.handlePDFFile(reader);
        reader.readAsArrayBuffer(file);
        break;

      default:
        alert("I'm sorry, that file was not recognized.");
        break;
    }
  }

  //Stores users input for manually entered table to allow for persistence across page changes
  handleManualEarnings(input) {
    // eslint-disable-next-line
    const [type, year, key] = input.target.id.split("_");

    var tempManualTable = this.state.manualTable;

    if (Object.keys(tempManualTable).includes(year)) {
      tempManualTable[year] = Number(input.target.value);
    }

    this.setState({
      manualTable: tempManualTable
    });
  }

  //Saves manually entered record to this.state.earningsRecord object, becomes noticable to Observable API
  handleSave() {
    //Load earnings record; if not present, set default record.
    var tempRecord = this.state.earningsRecord ? this.state.earningsRecord : {};

    //Update global earnings record with the manually inputed values
    Object.keys(this.state.manualTable).forEach((year, i) => {
      tempRecord[year] = this.state.manualTable[year];
    });

    //Store earnings record
    var earningsJSON = JSON.stringify(tempRecord);
    SessionStore.push("earnings", earningsJSON);

    this.setState({
      earningsRecord: tempRecord
    });

    //Display autosave message, 3 second timeout
    var savediv = document.getElementById("AutoSave");
    savediv.style.display = "grid";
    setTimeout(function() {
      savediv.style.display = "none";
    }, 3000);
  }

  render() {
    return (
      <div className="upload-form">
        <UploadButton style={{ display: this.props.manual ? "none" : true }}>
          <UploadLabel htmlFor="inputfile" className="btn">
            {this.state.buttonText}
          </UploadLabel>
          <UploadInput
            type={this.state.buttonType}
            id="inputfile"
            ref={this.fileInput}
            onChange={this.state.buttonFunction}
          ></UploadInput>
        </UploadButton>
        <GenerateTable
          parsedXml={this.state.earningsRecord}
          handleInputEarnings={this.handleInputEarnings}
          manual={this.props.manual}
          manualTable={this.state.manualTable}
          handleManualEarnings={this.handleManualEarnings}
          handleSave={this.handleSave}
          fileName={this.state.fileName}
        />
        <div id="AutoSave" style={{ display: "none" }}>
          Record has been saved.
        </div>
      </div>
    );
  }
}
