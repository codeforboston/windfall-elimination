import React from "react";
import {Runtime, Inspector} from "@observablehq/notebook-runtime";
import notebook from "windfall-awareness-notebook-prototype";
import { node } from "prop-types";

export const ObservableContext = React.createContext();


export class ObservableRuntime extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.registerCellRef = this.registerCellRef.bind(this);
      this.resetCellRefs = this.resetCellRefs.bind(this);

      this.state = {
        childrenCellRefs: [],
        runtimeState: {},
        allCells: [],
        allNamedCells: []
      };
   }

  componentDidMount() {
    this.state.runtimeState= Runtime.load(notebook, (cell) => {
        this.state.allCells.push(cell)
        const match = this.state.childrenCellRefs.find(n => n.cellName === cell.name) 
        if (match) {
          return new Inspector(match.domRef);
        }
      });
    this.state.allNamedCells = this.state.allCells.map((n) => n.name).filter(n => n!== undefined)
    //"viewof yearsSubstantialEarningsPicked", "yearsSubstantialEarningsPicked", "viewof AIMEPicked", "AIMEPicked",
    // "viewof birthDatePicked", "birthDatePicked", "viewof ageToRetirePicked", "ageToRetirePicked", "viewof ageToRetireExtraMonthsPicked",
    // "ageToRetireExtraMonthsPicked", "viewof pensionNonCoveredMonthly", "pensionNonCoveredMonthly", "calculationDisplay", "viewof retireDatePicked", 
    // "retireDatePicked", "yearOf62yo", "viewof v", "v", "variableRetireDate", "rangeData", "viewof sourceOfRetireeProfile", "sourceOfRetireeProfile",
    //  "loadRetireeXML", "viewof perYearEarnings", "perYearEarnings", "getAIMEfromEarningRecord", "getSubstantialEarningsYears", "gestAIME", "getBenefitReduction",
    // "findBendPoints", "getPIA", "getWepMPB", "firstPiaFactor", "getGuaranteeLimit", "viewof useCacheUrlNotSheets", "useCacheUrlNotSheets", "checkCache",
    // "ColaTable", "benefitReductionTable", "substantialEarningsMarks", "bendPoints", "parsedXmlFileText", "fileTextTemp", "makePerYearEarningsTable",
    // "addRetirementAgeToBirthdate", "dayjs", "fastXml", "d3", "Tesseract", "viewof applyWEP", "applyWEP", "image", "ocrResult", "ocrParsedData"
  }

  componentDidUpdate() {
    //TODO: preserve Observable notebook app between updates 
    Runtime.load(notebook, (cell) => {
      const match = this.state.childrenCellRefs.find(n => n.cellName === cell.name) 
      if (match) {
        return new Inspector(match.domRef);
      }
        });
  }

  registerCellRef(cellName, domRef) {
    this.state.childrenCellRefs.push({cellName, domRef})
  }

  resetCellRefs() {
    this.state.childrenCellRefs = []
  }

  render() {
      return <ObservableContext.Provider value={{
           registerCellRef: this.registerCellRef, 
           resetCellRefs: this.resetCellRefs 
           }}>
         {this.props.children}
       </ObservableContext.Provider>
  }

}
