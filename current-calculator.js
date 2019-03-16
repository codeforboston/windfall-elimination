// Calculates retirement, disability, and survivors benefits.  As part of
// this process, also calculates insured status at time of retirement and
// insured status at time of disability or death.
// called by Calculate Benefit button onClick=calculate()
function calculate() {
	var df = true;
	var af = true;
	var ic = true;
	var ef = true;
	var cf = true;
	var ff = true;
	var ncp = true;
	// check birthdate input format
	df = format_date( document.inputForm.bday.value );
	if ( birth_day == 1 ) {
		adjust_date();
	} else {
		birth_month_adjusted = birth_month;
		birth_year_adjusted = birth_year;
		birth_day_adjusted = birth_day - 1;
	}
	if ( df ) {
		af = checkAge(); // set and check retirement age
	}
	var choices = document.inputForm.selections.selectedIndex;
	if ( df && af ) {
		ic = format_inflation_choices( choices ); // check inflation choices
	}
	if ( df && af && ic ) {
		ef = initearn(); // check historical earnings
	}
	if ( df && af && ic && ef ) {
		// check current earnings.
		if ( document.currentEarningsForm.currentEarning.value != "" ) {
			cf = !isNaN( formatDollarAmount( document.currentEarningsForm.currentEarning.value ) );
			if ( cf == false ) {
				document.currentEarningsForm.currentEarning.focus();
				document.currentEarningsForm.currentEarning.select();
			}
		}
		if ( cf ) {
			// check future earnings.
			if ( document.currentEarningsForm.futureEarning.value != "" ) {
				ff = !isNaN( formatDollarAmount( document.currentEarningsForm.futureEarning.value ) );
				if ( ff == false ) {
					document.currentEarningsForm.futureEarning.focus();
					document.currentEarningsForm.futureEarning.select();
				}
			}
		}
	}
	if ( do_wep && df && af && ic && ef && cf && ff ) {
		ncp = initNcPen(); // check non-covered pension amount
	}
	if ( df && af && ic && ef && cf && ff && ncp ) {
		debug( "Beginning new calculation." );
		debug( "current_year is set to " + current_year );
		debug( "current_month is set to " + current_month );
		debug( "years is set to " + years );
		debug( "" );
		debug( "Earnings from form:" );
		for ( var i = 0; i < total_years; i++ ) {
			if ( i < years )
				debug( "earn[" + i + "] " + ( 1951 + i ) + " = " + earn[ i ] );
		}
		initindexedEarnings();
		initcpi();
		initfq();
		initqcamt();
		initbase();
		if ( do_wep ) {
			initycamt();
		}
		initqc();

		if ( choices == 0 ) {
			onFlatAssumptions();
		}
		if ( choices == 1 ) {
			onInflatedAssumptions();
		}
		// eligibility for disability or survivors occurs at earlier of age 62
		// or current year
		oldageEligYear = birth_year_adjusted + 62;
		disurvEligYear = Math.min( oldageEligYear, current_year );
		fullRetAge = fullRetAgeCal( oldageEligYear );
		ageNow = 12 * ( current_year - birth_year_adjusted ) +
			current_month - birth_month_adjusted;
		birth_year_adjusted22 = birth_year_adjusted + 22;
		oldAgeDateCal();
		prepareEarnings();
		oldageQcReq = qcReqCal( birth_year_adjusted22, oldageEligYear );
		oldageN = oldageQcReq - 5;
		survQcReq = qcReqCal( birth_year_adjusted22, disurvEligYear );
		survN = Math.max( survQcReq - 5, 2 );

		// period over which qcs must be earned for disability ends in current
		// year, even if eligibility occurred before then
		diQcReq = diQcReqCal( birth_year_adjusted22, current_year );
		diElapsed = diElapsedCal( birth_year_adjusted22, disurvEligYear );
		diDropout = Math.min( Math.floor( diElapsed / 5 ), 5 );
		diN = diElapsed - diDropout;
		qcCal();
		debug( "" );
		debug( "Testing for old age fully insured status." );
		oldageFullyInsured = fullyInsuredCal( oldageBenefitYear - 1950,
			oldageBenefitMonth, oldageQcReq );
		debug( "Old age status test complete." );
		debug( "" );
		debug( "Testing for survivor benefit fully insured status." );
		survFullyInsured = fullyInsuredCal( ( current_year - 1950 ), current_month, survQcReq );
		debug( "Survivor benefit status test complete." );
		debug( "" );
		debug( "Testing for disability benefit fully insured status." );
		disabilityInsured = disabilityInsuredCal( ( current_year - 1950 ), diQcReq );
		debug( "Disability benefit status test complete." );
		debug( "" );
		debug( "Running old age benefit calculation." );
		debug( "oldageFullyInsured = " + oldageFullyInsured );
		// check insured status for retirement benefit
		if ( oldageFullyInsured == 0 ) {
			oldageMba = 0.0;
			debug( "Ineligible for old age benefit." );
			debug( "Old age benefit calculation finished." );
		} else {
			debug( "oldageEligYear = " + oldageEligYear );
			debug( "oldageBenefitYear = " + oldageBenefitYear );
			debug( "oldageN = " + oldageN );
			debug( "oldageFullyInsured = " + oldageFullyInsured );
			if ( do_wep ) {
				debug( "" );
				debug( "Calculating years of coverage for Wep." );
				oaYc = ycCal( oldageBenefitYear - 1951 );
				debug( "Total old-age Wep years of coverage = " + oaYc );
				debug( "" );
				debug( "Calculating old-age Wep percentage." );
				oaWepPercent = wepPercentCal( oaYc, oldageEligYear );
				debug( "Old-age Wep percentage = " + oaWepPercent );
			}
			// use earnings through year prior to retirement benefit year
			indexEarnings( oldageEligYear, oldageBenefitYear - 1 );
			sortEarnings( oldageBenefitYear - 1 );
			oldageAime = aimeCal( oldageN, oldageBenefitYear - 1 );
			bendPiaProject( oldageEligYear );
			setPortionAime( oldageAime );
			oldagePiaElig = aimepiaCal();
			if ( do_wep ) {
				wepOldAgePiaElig = wepAimePiaCal( oaWepPercent );
				wepGuarOldAgePiaElig = dimeRoundDown( oldagePiaElig - ( ncPenAmt / 2.0 ) );
				wepOldAgePia = applyColas( wepOldAgePiaElig, oldageBenefitYear,
					oldageBenefitMonth, oldageEligYear );
				wepGuarOldAgePia = applyColas( wepGuarOldAgePiaElig, oldageBenefitYear,
					oldageBenefitMonth, oldageEligYear );
				if ( wepGuarOldAgePia >= wepOldAgePia ) {
					oldagePia = wepGuarOldAgePia;
				} else {
					oldagePia = wepOldAgePia;
				}
			} else {
				oldagePia = applyColas( oldagePiaElig, oldageBenefitYear,
					oldageBenefitMonth, oldageEligYear );
			}
			debug( "" );
			debug( "Calculating monthsArdri in one of two branches." );
			if ( fullRetAge > benefitAge ) {
				monthsArdri = fullRetAge - benefitAge;
				debug( "(1) monthsArdri = " + monthsArdri );
				mbaFactor = reductionCal();
			} else {
				monthsArdri = 0;
				mbaFactor = 1.0;
				if ( oldageFullyInsured == 2 ) {
					// must be fully insured before age 70 to get DRCs
					insuredAge = insuredAgeCal( total_years, oldageQcReq );
					if ( insuredAge < 70 * 12 ) {
						if ( benefitAge >= 70 * 12 ) {
							// apply all months at age 70.
							monthsArdri = 70 * 12 - insuredAge;
							debug( "Age 70 increment months used." );
							debug( "(2) monthsArdri = " + monthsArdri );
						} else {
							// apply months before January of benefit year for earlier ages.
							monthsArdri = Math.max( ( benefitAge - oldageBenefitMonth + 1 ) - insuredAge, 0 );
							debug( "Pre-70 increment months used." );
							debug( "(2) monthsArdri = " + monthsArdri );
						}
						mbaFactor = incrementCal( oldageEligYear );
					}
				}
			}
			oldageMba = dollarRoundDown( mbaFactor * oldagePia );
		}
		debug( "" );
		debug( "Old age benefit calculation finished." );
		debug( "oldageMba = " + oldageMba );

		debug( "" );
		debug( "Running disability benefit calculation." );
		debug( "disabilityInsured = " + disabilityInsured );
		// check insured status for disability benefit
		if ( disabilityInsured == 0 ) {
			diMba = 0.0;
			debug( "Ineligible for disability benefit." );
			debug( "Disability benefit calculation finished." );
		} else {
			if ( do_wep ) {
				debug( "" );
				debug( "Calculating years of coverage for Wep." );
				diYc = ycCal( current_year - 1951 );
				debug( "Total disability Wep years of coverage = " + diYc );
				debug( "" );
				debug( "Calculating disability Wep percentage." );
				diWepPercent = wepPercentCal( diYc, disurvEligYear );
				debug( "Disability Wep percentage = " + diWepPercent );
			}
			// use earnings through year prior to current year
			indexEarnings( disurvEligYear, current_year - 1 );
			sortEarnings( current_year - 1 );
			diAime = aimeCal( diN, current_year - 1 );
			bendPiaProject( disurvEligYear );
			setPortionAime( diAime );
			diPiaElig = aimepiaCal();
			if ( do_wep ) {
				wepDiPiaElig = wepAimePiaCal( diWepPercent );
				wepGuarDiPiaElig = dimeRoundDown( diPiaElig - ( ncPenAmt / 2.0 ) );
				wepDiPia = applyColas( wepDiPiaElig, current_year, current_month,
					disurvEligYear );
				wepGuarDiPia = applyColas( wepGuarDiPiaElig, current_year, current_month,
					disurvEligYear );
				if ( wepGuarOldAgePia >= wepOldAgePia ) {
					diPia = wepGuarDiPia;
				} else {
					diPia = wepDiPia;
				}
			} else {
				diPia = applyColas( diPiaElig, current_year, current_month,
					disurvEligYear );
			}

			// assume no reduction or increment for disability benefit
			diMba = dollarRoundDown( diPia );
		}
		debug( "" );
		debug( "Running survivor benefits calculation." );
		debug( "survFullyInsured = " + survFullyInsured );
		// check insured status for survivor benefits
		if ( survFullyInsured == 0 ) {
			survTotalMba = 0.0;
			survChildMba = 0.0;
			survMotherMba = 0.0;
			survWidowMba = 0.0;
			debug( "Ineligible for survivor benefit." );
			debug( "Survivor benefit calculation finished." );
		} else {
			// use earnings through current year for survivor case
			indexEarnings( disurvEligYear, current_year );
			sortEarnings( current_year );
			survAime = aimeCal( survN, current_year );
			bendPiaProject( disurvEligYear );
			bendMfbProject( disurvEligYear );
			setPortionAime( survAime );
			survPiaElig = aimepiaCal();
			survPia = applyColas( survPiaElig, current_year, current_month,
				disurvEligYear );
			setPortionPia( survPiaElig );
			survMfbElig = mfbCal();
			survTotalMba = dimeRoundDown( applyColas( survMfbElig, current_year,
				current_month, disurvEligYear ) );
			// 75 percent factor for child and mother
			survChildMba = dollarRoundDown( .75 * survPia );
			survMotherMba = survChildMba;
			// 100 percent factor for widow at full retirement age
			survWidowMba = dollarRoundDown( survPia );
			debug( "" );
			debug( "Survivor benefit calculation finished." );
			debug( "survChildMba = " + survChildMba );
			debug( "survMotherMba = " + survMotherMba );
			debug( "survWidowMba = " + survWidowMba );
			debug( "survTotalMba = " + survTotalMba );
		}
		document.insuredStatusForm.fullyInsuredText.focus();
		print_results();
	} else {
		clear_results();
	}
}
