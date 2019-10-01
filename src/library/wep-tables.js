import * as d3 from "d3";
import { checkJSONCache } from "./wep-cache";

var getWepTables = (function() {

	var ColaTable = function() {
		const ColaTable = checkJSONCache("ColaTable") || d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1291489757&single=true&output=csv",
		                    ({Year, COLA}) => 
		                    ({year: +Year,
		                      Cola: Number(COLA)})
                   			)

		return ColaTable
	}

	var benefitReductionTable = function(){
		const benefitReductionTable = checkJSONCache("benefitReductionTable") || d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=297756699&single=true&output=csv',
                    ({YearOfBirth, NormalRetirementAge, PctCreditForEachDelayYear, age62,age63,age64,age65,age66,age67,age68,age69,age70}) => 
                    ({year: +YearOfBirth,
                      NormalRetirementAge: +NormalRetirementAge,
                      PctCreditForEachDelayYear: +PctCreditForEachDelayYear,
                      yearsFrom62: [age62,age63,age64,age65,age66,age67,age68,age69,age70].map(d => +d/100)
                      })
                    )

        return benefitReductionTable
	}

	var substantialEarningsMarks = function() {
		const substantialEarningsMarks = checkJSONCache("substantialEarningsMarks") || d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1895732439&single=true&output=csv',
                    ({Year, SubstantialEarnings}) => 
                    ({year: +Year,
                      SubstantialEarnings: Number(SubstantialEarnings.replace("$",""))})
                   )

		return substantialEarningsMarks
	}


	var bendPoints = function() {
		const bendPoints = checkJSONCache("bendPoints") || d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1610617310&single=true&output=csv',
                    ({Year, FirstDollarAmtPIA, SecondDollarAmtPIA, DollarAmtInMaxFamilyBenefitFormula}) => 
                    ({year: +Year,
                      FirstDollarAmtPIA: Number(FirstDollarAmtPIA.replace("$","")),
                      SecondDollarAmtPIA: Number(SecondDollarAmtPIA.replace("$","").replace(",", "")),
                      DollarAmtInMaxFamilyBenefitFormula: Number(DollarAmtInMaxFamilyBenefitFormula.replace("$","").replace(",", ""))})
                   ) //

		return bendPoints
	}
	var maximumEarningsCreditable = function() {
		// used only for the AIME from earnings calculation.
		const maximumEarningsCreditable = checkJSONCache("maximumEarningsCreditable") || d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=519940844&single=true&output=csv',
                    ({Year, TaxRatePct, MaximumWagesTaxable, MaximumAnnualContributions}) => 
                    ({year: +Year,
                      maximumEarningsCreditable: +MaximumWagesTaxable
                     })
               )
		return maximumEarningsCreditable
	}

	var averageWageIndexTable = function() {

		const averageWageIndexTable = checkJSONCache("averageWageIndexTable") || d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1069245443&single=true&output=csv',
                    ({Year, AverageWageIndex}) => 
                    ({year: +Year,
                      averageWageIndex: +AverageWageIndex
                     })
               )

		return averageWageIndexTable
	}

	var fullRetirementAgeTable = function() {

		const fullRetirementAge = checkJSONCache("fullRetirementAge")

		return fullRetirementAge
	}

	return {
		ColaTable: ColaTable,
	    benefitReductionTable: benefitReductionTable,
	    substantialEarningsMarks: substantialEarningsMarks,
	    bendPoints: bendPoints,
	    maximumEarningsCreditable: maximumEarningsCreditable,
	    averageWageIndexTable: averageWageIndexTable,
	    fullRetirementAgeTable: fullRetirementAgeTable
  	}

})();

export { getWepTables }