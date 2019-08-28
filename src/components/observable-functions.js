//Observable Functions
//Presented in order of call
import dayjs from "dayjs";
import React from "react";
import { getWepTables } from "../components";


///////////////////
// Calculate PIA //
///////////////////

// PIA Main

async function getPIA(aime, dob, yearsSubstantialEarnings=null, isWEP=true) {
  if (findBendPoints(dob) === undefined) {
    throw new Error("Too young – bend points not yet set?")
  }
  //unpack the two bend points from the object into an array
  const bendP = [(await findBendPoints(dob)).FirstDollarAmtPIA, (await findBendPoints(dob)).SecondDollarAmtPIA];
  //between 40% and 90% factor is calculated
  const firstFactor = firstPiaFactor(yearsSubstantialEarnings, isWEP);

  let pia;
  
  if (aime > bendP[1]) {
    pia =
      firstFactor * bendP[0] +
      0.32 * (bendP[1] - bendP[0]) +
      0.15 * (aime - bendP[1]);
    
  } else if (aime > bendP[0]) {
    pia = firstFactor * bendP[0] + 0.32 * (aime - bendP[0]);
    
  } else {
    pia = firstFactor * aime;
  }
  
  return pia;
}

//PIA Dependencies

async function findBendPoints(dob) {
	const bendPoints = await getWepTables.bendPoints()
  	const yearOf62yo = dayjs(dob).add(62, 'years').year()
  	return await bendPoints.find(d => d.year === yearOf62yo);
}

/*
firstPiaFactor()** used for the factor/coefficient of the first "bin", ranging from 40% to 90%. There are three "bins", between the two bendpoints. 
(The other two bins have constant coefficients, but the bins may be empty.)
*yearsSubstantialEarnings*, an integer representing the user's years of substantial earnings under the WEP
**Returns**: a float to multiply by
*/

//between 40% and 90% factor is calculated inside wepCoeff
function firstPiaFactor(yse, isWEP) {
  
  if (!isWEP) {
    return 0.9
  } else if (yse === null) {
     throw new Error("Tally of years of substantial earnings are needed for WEP PIA factor")
  }
	//## SU: this "hardcoded" approach is obviously not ideal
	let wep_coeff = .4
	if (yse <= 20) { wep_coeff = .4 }
	if (yse === 21) { wep_coeff = .45}
	if (yse === 22) { wep_coeff = .5}
	if (yse === 23) { wep_coeff = .55} 
	if (yse === 24) { wep_coeff = .6 }
	if (yse === 25) { wep_coeff = .65 }
	if (yse === 26) { wep_coeff = .7}
	if (yse === 27) { wep_coeff = .75} 
	if (yse === 28) { wep_coeff = .8}
	if (yse === 29) { wep_coeff = .85}
	if (yse >= 30) { wep_coeff = .9}
	return wep_coeff
}

//----------------------------------------------------------------------------------


////////////////////
// Calculate AIME //
////////////////////

/* *getAIMEFromEarnings()** Calculates the beneficiary's AIME from their earnings records
 Unlike the getAIME() function, this function generates an exact number,
 rather than a ballpark estimate

Parameters:

* rawEarnings, a key-value store for each year as a key, containing earnings as a string.
* indexingYear, the second year before the beneficiary's year of attainment of age 62
* maxECTable, an array of objects containing a year, the maximum earnings creditable for that year
* avgWageIndexTable: the average earnings across all workers in that year

**Returns**: AIME, representing the user's AIME, which is rounded down to an integer
*/

function getAIMEFromEarnings(rawEarnings, indexingYear, maxECTable, avgWageIndexTable) {
  
  //Determine # of calculation years
  let numCalculationYears = 0;
  if (indexingYear >= 1989) numCalculationYears = 35;
  else if (indexingYear <= 1956) numCalculationYears = 0;
  else numCalculationYears = 35 - (1989-indexingYear);
  
  //convert earnings from key-value's with strings inside, to object format with numbers inside.
  const earnings = Object.keys(rawEarnings).map(n => ({year: parseInt(n, 10), amount: parseInt(rawEarnings[n], 10)}))
  
  let earningsMap = {}; // This map will contain key-value pairs of year-amount earned (for the user)
  if (Array.isArray(earnings)) {
    earnings.forEach((earning) => {
      earningsMap[earning.year] = earning.amount;
    });
  } //throw new Error("") - but what would this error be?

  let averageMap = {}; //This map will contain key-value pairs of year-average earnings from table
  if (Array.isArray(avgWageIndexTable)) {
    avgWageIndexTable.forEach((earning) => {
      if (earning.year > 1950 && (earningsMap[earning.year] !== undefined || earning.year >= indexingYear-39 || earning.year < indexingYear+2)) {
        averageMap[earning.year] = avgWageIndexTable.find(d => d.year === earning.year).averageWageIndex;
      }
    });
  }//throw new Error("") - but what would this error be?
  
  //return averageMap

  let maximumMap = {}; //This map will contain key-value pairs of year-maximum from table
  if (Array.isArray(maxECTable)) {
    earnings.forEach((earning) => {
      if (earning.year >= 1950 && (earningsMap[earning.year] !== undefined || (earning.year >= indexingYear-39 && earning.year < indexingYear+2))) {
        maximumMap[earning.year] = maxECTable.find(d => d.year === earning.year).maximumEarningsCreditable;
      }
    });
  }//throw new Error("") - but what would this error be?

  //Check that averageMap and maximumMap have the same length and set of keys?


  //adjust each year's earning to match the indexing year, then add the modified yearly earnings to an array
  let earningsYears = earnings.map(n => n.year);
  let validEarnings = []; //array of each year of valid earnings;
                          //specific year or ordering ceases to be relevant
  let debugValidEarnings = [];
  if (Array.isArray(earningsYears)) {
    earningsYears.forEach((earningsYear) => {
      if (earningsYear < indexingYear && !(isNaN(earningsYear)) && maximumMap[earningsYear] !== undefined && averageMap[earningsYear] !== undefined) {
        debugValidEarnings.push({
          'yr': earningsYear,
          'specialIndexingYear': false,
          'indexOnYear': indexingYear,
          'eMap':earningsMap[earningsYear],
          'mxMap': maximumMap[earningsYear],
          'min':  Math.min(earningsMap[earningsYear], maximumMap[earningsYear]), //* averageMap[indexingYear],
          'minSafe':  Math.min(earningsMap[earningsYear], isNaN(maximumMap[earningsYear]) ? 0 : maximumMap[earningsYear]),
          'avgMapIndex': averageMap,
          'avgMapYr': averageMap[earningsYear],
          'validEarningCalc': Math.min(earningsMap[earningsYear], maximumMap[earningsYear]) * averageMap[indexingYear] / averageMap[earningsYear]
        });
        // validEarnings.push(Math.min(earningsMap[earningsYear], maximumMap[earningsYear]) * averageMap[indexingYear] / averageMap[earningsYear])
      }
      else if (earningsYear === indexingYear && !(isNaN(earningsYear)) && maximumMap[earningsYear] !== undefined && averageMap[earningsYear] !== undefined) {
         debugValidEarnings.push({
          'yr': earningsYear,
          'specialIndexingYear': true,
          'eMap':earningsMap[earningsYear],
          'mxMap': maximumMap[earningsYear],
          'min':  Math.min(earningsMap[earningsYear], maximumMap[earningsYear]), //* averageMap[indexingYear],
          'minSafe':  Math.min(earningsMap[earningsYear], isNaN(maximumMap[earningsYear]) ? 0 : maximumMap[earningsYear]),
          'avgMapIndex': averageMap[indexingYear],
          'avgMapYr': averageMap[earningsYear],
          'validEarningCalc': Math.min(earningsMap[earningsYear], maximumMap[earningsYear])
        });
        
        //validEarnings.push(
        //  Math.min(earningsMap[earningsYear], maximumMap[earningsYear])
        //  ); //I'm not sure if this correctly handles situations where a year is missing in earningsMap
      }
      else if (earningsYear > indexingYear && !(isNaN(earningsYear)) && maximumMap[earningsYear] !== undefined && averageMap[earningsYear] !== undefined) {
        debugValidEarnings.push({
          'yr': earningsYear,
          'specialIndexingYear': false,
          'eMap':earningsMap[earningsYear],
          'mxMap': maximumMap[earningsYear],
          'min': Math.min(earningsMap[earningsYear], maximumMap[earningsYear]),
          'minSafe': Math.min(earningsMap[earningsYear], isNaN(maximumMap[earningsYear]) ? 0 :
                          maximumMap[earningsYear]),
          'avgMapIndex': averageMap[indexingYear],
          'avgMapYr': averageMap[indexingYear],
          'validEarningCalc': Math.min(earningsMap[earningsYear], maximumMap[earningsYear]) //Years after indexing year are not indexed; this is favorable to beneficiaries
        });
      }
    });
  }
  //Remove members of validEarnings until length matches the number of calculation years
  const toCut = debugValidEarnings.length-numCalculationYears;
  if (toCut >= 0) {
    validEarnings = debugValidEarnings.sort((m, n) => m.validEarningCalc - n.validEarningCalc).slice(toCut).map(n => n.validEarningCalc);
  } else {
    validEarnings = debugValidEarnings;
  }
  
  //Sum the earning into AIME
  let AIME = 0; //Starts at 0, to facilitate later summation

  validEarnings.forEach((earning) => {
    AIME += earning;
  });
  //Divide AIME by number of months ()
  AIME = AIME / (numCalculationYears * 12);
  return Math.floor(AIME);
}


//----------------------------------------------------------------------------------



////////////////////////////
// Aggregate ColA Factors //
////////////////////////////


//Cola Main
async function getAggregateColaFactor(eligibilityYear, retireYearDate) {

  	//eligibilityYear is already a numberical year, not a date
  	const retireYear = dayjs(retireYearDate).year() //remember the year() here
  
  	//You're retiring before you're eligible for COLA
  	if (retireYear < eligibilityYear + 1 ) {
  	  return 1;
  	}
  
  	// Always use eligibilityYear plus 1, when COLA begins to be applied.
  	const colaFactors = await getColaFactors(eligibilityYear + 1, retireYear);

  	const reducer = (accumulator, current) => accumulator * (100 + current) * 0.01;
  	const aggColaIncRate = colaFactors.reduce(reducer, 100) * 0.01;

  	console.log("Aggregate Cola: ",aggColaIncRate)
  	return aggColaIncRate;
}

//Cola Dependency

async function getColaFactors(yearStart, yearEnd) {
	const ColaTable = await getWepTables.ColaTable()

	const colaTableFilter = ColaTable.filter(d => d.year >= yearStart && d.year <= yearEnd).map(d => d.Cola)
	
	return colaTableFilter;
}




//----------------------------------------------------------------------------------




//////////////////////////////////////
// Get WEP Maximum Payable Benefits //
//////////////////////////////////////


/* *getWepMPB()** Calculates Social Security benefits of a person affected by WEP. 
It may be prudent at some point to change this to calculate "primary insurance amount" (PIA),
and apply early retirement later, in order to better work with the
proposed "slider"

**Returns**: A float, representing the user's Maximum Payable Benefit
*/

// getWepMPB Main

async function getWepMPB(aime, dob, retireDate, yearOf62yo, yearsSubstantialEarnings, pensionNonCoveredMonthly) {
  const standardPIA = await getPIA(aime, dob, null, false);
  console.log("WepMPB StandardPIA: ", standardPIA)
  const wepPIA = await getPIA(aime, dob, yearsSubstantialEarnings, true);
  console.log("WepMPB WEPPIA: ", wepPIA)
  const wepDiff = standardPIA - wepPIA;
  console.log("WepMPB WEP Difference: ", wepDiff)
  const wepReduction = await getGuaranteeLimit(wepDiff, pensionNonCoveredMonthly);
  console.log("WepMPB WEP Reduction: ", wepReduction)
  const finalPIA = standardPIA - wepReduction;
  console.log("WepMPB Final PIA: ", finalPIA)
  const retireYear = dayjs(retireDate).year();
  console.log("Retire Year ", retireYear)
  const mpb = finalPIA * (await getAggregateColaFactor(yearOf62yo, retireYear)) * (await getBenefitReduction(dob, retireDate));

  console.log("mpb: ", mpb)
  return mpb;
}


// getWepMPB Dependencies

// getPIA ---- Line 9
// getAggregateColaFactor ---- Line 222


/* 
getGuaranteeLimit()** limits the amount of WEP benefit reduction to half of the monthly noncovered pension. The guarantee is designed to help protect workers with low pensions from losing too much of their benefits.

*wepDiff*, a float representing the benefit reduction to PIA based on the basic WEP formula  
*pension*, a float representing the monthly dollar amount received from a non-covered pension

**Returns**: a float representing the maximum PIA reduction due to WEP
*/

function getGuaranteeLimit(wepDiff, pension) {
	console.log("pension", pension)
  const guaranteeLimit = pension / 2;
  console.log("guaranteeLimit", guaranteeLimit)
  return Math.min(wepDiff, guaranteeLimit);
}


async function getBenefitReduction(dob, retireDate) {
  const birthYearDate = dayjs(dob);
  const retireYearDate = dayjs(retireDate);
  
  //Difference .diff(compared: Dayjs, unit: string (default: 'milliseconds'), float?: boolean)
  const floatYearsAfter62yo = retireYearDate.diff(birthYearDate,'years',true)-62
  const intYearsAfter62yo = retireYearDate.diff(birthYearDate,'years',false)-62

  const benefitReductionTable = await getWepTables.benefitReductionTable()
   
  
  let reduction;
  const rowOfReduction = benefitReductionTable.find(d => d.year === birthYearDate.year());
  
  if (rowOfReduction) {
    //calculate: that retirement year's credit per year / fraction of the extra year. 
    // Remember PctCreditForEachDelayYear is in whole numbers like 9.333%, not 0.09333
    //TODO: extra days of the month should never affect floatYearsAfter62yo when retirement date set directly.
    let extraMonthsCredit = 0
    if ((floatYearsAfter62yo - intYearsAfter62yo) !== 0) {
      const fractionOfYearMonths = (floatYearsAfter62yo - intYearsAfter62yo);
      extraMonthsCredit = (rowOfReduction.PctCreditForEachDelayYear*0.01) * fractionOfYearMonths;
      //console.log("on ",rowOfReduction.yearsFrom62[intYearsAfter62yo]," give them ",extraMonthsCredit," because ", fractionOfYearMonths," and ", rowOfReduction.PctCreditForEachDelayYear*0.01)
    }
    //sum basic calculation and extra month's credit
    return rowOfReduction.yearsFrom62[intYearsAfter62yo] + extraMonthsCredit;
  } else {
    throw new Error("No reduction found – try experimental table");
  }
}




//----------------------------------------------------------------------------------




////////////////////////////////
// Final Calculation Display //
///////////////////////////////


function finalCalculation(packedValues, rawEarnings, indexingYear, birthDatePicked, retireDatePicked, yearsSubstantialEarningsPicked, pensionNonCoveredMonthly) {

	const maxECTable = getWepTables.maximumEarningsCreditable()
	const avgWageIndexTable = getWepTables.averageWageIndexTable()

	var AIMEPicked = getAIMEFromEarnings(rawEarnings, indexingYear, maxECTable, avgWageIndexTable)

	const standardPIA = getPIA(AIMEPicked, birthDatePicked, null, false).toFixed(2)
	const wepPIA = getPIA(AIMEPicked, birthDatePicked, yearsSubstantialEarningsPicked, true).toFixed(2)
	const wepDiff = (getPIA(AIMEPicked, birthDatePicked, null, false) - getPIA(AIMEPicked, birthDatePicked, yearsSubstantialEarningsPicked, true)).toFixed(2)
	const wepMPB = getWepMPB(AIMEPicked, birthDatePicked, retireDatePicked, yearsSubstantialEarningsPicked, pensionNonCoveredMonthly).toFixed(2)

	return(
		<div>
		Standard PIA: ${standardPIA} per month  
		WEP PIA: ${wepPIA} per month  
		WEP difference: ${wepDiff} per month

		Windfall Elimination Maximum Payable Benefit calculated:  
		${wepMPB} per month
		</div>
	)
}




export {
	getPIA,
	findBendPoints,
	firstPiaFactor,
	getAIMEFromEarnings,
	getAggregateColaFactor,
	getColaFactors,
	getWepMPB,
	getGuaranteeLimit,
	getBenefitReduction,
	finalCalculation
}













































