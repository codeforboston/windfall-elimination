import React from "react";
import styled from "@emotion/styled";
import fastXml from "fast-xml-parser";
import pdfJS from "pdfjs-dist";
import { spacing, colors, fontSizes, radii } from "../constants";
import { ObservableCell, Glossary } from "../components";
import { SessionStore } from "../library/session-store";

//Upload page specific css/html
export const UploadButton = styled("div")`
  position: relative;
  padding: 25px 0 0 0;
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
      var earnings =
        parsedXml["osss:OnlineSocialSecurityStatementData"][
          "osss:EarningsRecord"
        ]["osss:Earnings"];
      tableRows = earnings.map((earning, i) => {
        const earningValueXML = earning["osss:FicaEarnings"]
          ? { defaultValue: earning["osss:FicaEarnings"] }
          : { placeholder: 0 };
        return (
          <React.Fragment key={"earning" + i}>
            <TD>
              <LabelBox>
                <YearLabel>{earning["@_startYear"]}</YearLabel>
              </LabelBox>
              <TableInput
                id={earning["@_startYear"]}
                {...earningValueXML}
                onChange={this.props.handleInputEarnings}
              />
            </TD>
          </React.Fragment>
        );
      });
      earningsSize = tableRows.length;
    } else if (this.props.manual) {
      tableRows = this.props.manualTable.map((record, key) => {
        const earningValue = record["value"]
          ? { defaultValue: record["value"] }
          : { placeholder: 0 };
        return (
          <React.Fragment key={"earning" + key}>
            <TD>
              <LabelBox>
                <YearLabel>{record["year"]}</YearLabel>
              </LabelBox>
              <TableInput
                type="text"
                id={"value_" + record["year"] + "_" + key}
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
        <h1>Year-by-year Earning Records</h1>
         <h2>{earningsSize} rows {displayFile}</h2>
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
      defaultRecord: {
        "osss:OnlineSocialSecurityStatementData": {
          "osss:EarningsRecord": {
            "osss:Earnings": []
          }
        },
        filename: undefined
      },
      userBirthDate: undefined,
      userRetireDate: undefined,
      estimatedYears: [],
      rowValues: [],
      manualTable: [],
      displayTable: false,
      buttonText: this.props.manual
        ? "Enter Earnings Record"
        : "Upload Earnings Record",
      buttonFunction: this.props.manual ? this.handleEnter : this.handleUpload,
      buttonType: this.props.manual ? "button" : "file",
      saveDisable: false
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    if (SessionStore.get("earnings")) {
      var earningsValue = JSON.parse(SessionStore.get("earnings"));
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

    var tempTable = [];
    var yearToRecord = {};

    if (SessionStore.get("tableArray")) {
      var tableArray = JSON.parse(SessionStore.get("tableArray"));
      tableArray.forEach(function(record) {
        yearToRecord[record.year] = record;
      });
    }

    if (birthdate !== undefined && retiredate !== undefined) {
      for (var i = birthdate; i <= retiredate; i++) {
        if (i in yearToRecord) {
          var record = yearToRecord[i];
        } else {
          record = {};
          record["year"] = i;
          record["value"] = 0;
        }
        tempTable.push(record);
      }
    }

    this.setState({
      manualTable: tempTable
    });
  }

  //For uploaded records: handles the updating of stored earnings record to match inputed value
  handleInputEarnings(input) {
    var modifiedEarnings = this.state.earningsRecord;
    var earnings =
      modifiedEarnings["osss:OnlineSocialSecurityStatementData"][
        "osss:EarningsRecord"
      ]["osss:Earnings"];
    var modifiedyear = input.target.id;

    var findValue = earnings.find(element => {
      if (element["@_startYear"] === modifiedyear) {
        element["osss:FicaEarnings"] = input.target.value;
        return true;
      } else {
        return false;
      }
    });

    if (findValue) {
      modifiedEarnings["osss:OnlineSocialSecurityStatementData"][
        "osss:EarningsRecord"
      ]["osss:Earnings"] = earnings;

      var earningsJSON = JSON.stringify(modifiedEarnings);
      SessionStore.push("earnings", earningsJSON);

      this.setState({
        earningsRecord: modifiedEarnings
      });
    }
  }

  //Parse XML file
  handleXMLFile(reader) {
    if (fastXml.validate(reader.target.result) === true) {
      var parsedText = fastXml.parse(reader.target.result, {
        ignoreAttributes: false
      });
      var earningsJSON = JSON.stringify(parsedText);
      SessionStore.push("earnings", earningsJSON);
      this.setState({
        earningsRecord: parsedText
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

    var tempRecord = this.state.defaultRecord;
    do {
      var newvalue = combinedValues.shift();
      if (newvalue > 1900) {
        var currentRecord =
          tempRecord["osss:OnlineSocialSecurityStatementData"][
            "osss:EarningsRecord"
          ]["osss:Earnings"];
        var newrecord = {
          "@_startYear": newvalue,
          "@_endYear": newvalue,
          "osss:FicaEarnings": combinedValues.shift(),
          "osss:MedicafreEarnings": combinedValues.shift()
        };
        currentRecord.push(newrecord);
      }
    } while (combinedValues.length > 0);

    var earningsJSON = JSON.stringify(this.state.defaultRecord);
    SessionStore.push("earnings", earningsJSON);
    this.setState({
      earningsRecord: this.state.defaultRecord
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

    if (tempManualTable[key]) {
      tempManualTable[key]["value"] = input.target.value;
    }

    this.setState({
      manualTable: tempManualTable
    });
  }

  //Saves manually entered record to this.state.earningsRecord object, becomes noticable to Observable API
  handleSave() {
    //Load earnings record; if not present, set default record.
    var tempRecord = this.state.earningsRecord
      ? this.state.earningsRecord["osss:OnlineSocialSecurityStatementData"][
          "osss:EarningsRecord"
        ]["osss:Earnings"].length === this.state.manualTable.length
        ? this.state.earningsRecord
        : this.state.defaultRecord
      : this.state.defaultRecord;

    //Update global earnings record with the manually inputed values
    this.state.manualTable.forEach((record, i) => {
      var currentRecord =
        tempRecord["osss:OnlineSocialSecurityStatementData"][
          "osss:EarningsRecord"
        ]["osss:Earnings"];
      var newrecord = {
        "@_startYear": record["year"],
        "@_endYear": record["year"],
        "osss:FicaEarnings": record["value"]
      };

      if (!currentRecord[i]) {
        currentRecord.push(newrecord);
      } else {
        currentRecord[i] = newrecord;
      }
    });

    //Store earnings record and updated table
    var arrayJSON = JSON.stringify(this.state.manualTable);
    SessionStore.push("tableArray", arrayJSON);

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
