import React from 'react'
import Slider from 'rc-slider';
import { colors } from '../constants'

const defaultFRA = () => {
  console.warn("That is odd: You used default Full Retirement Age in slider");
  return 67;
}

const AgeSlider = ({ preferPiaUserCalcValue, ageYearsOnly, ageMonthsOnly, handleChange, fullRetirementAgeYearsOnly, fullRetirementAgeMonthsOnly, fullRetirementAge = defaultFRA() }) => {
  return (
    <React.Fragment>
      <Slider
        style={{
          marginTop: 60,
          marginBottom: 60
        }}
        defaultValue={ageYearsOnly}
        min={62} max={70}
        marks=
        {{
          62: {
            label: <strong style={{ "fontSize": "18px" }}>62</strong>,
            style: {
              color: colors.black,
            }
          },
          [fullRetirementAgeYearsOnly]: {
            label: <strong style={{ "fontSize": "18px" }}>FRA: {fullRetirementAgeYearsOnly}</strong>,
            style: {
              color: colors.black,
            }
          },
          70: {
            label: <strong style={{ "fontSize": "18px" }}>70</strong>,
            style: {
              color: colors.black,
            }
          }
        }}
        step={1}
        trackStyle={{ backgroundColor: colors.gray }}
        handleStyle={{
          borderRadius: 0,
          height: 24,
          width: 15,
          marginTop: -10,
          backgroundColor: colors.purple,
          boxShadow: '0 0 0 0',
          borderColor: 'transparent'
        }}
        dotStyle={{ visibility: 'hidden' }}
        activeDotStyle={{ visibility: 'hidden' }}
        railStyle={{ backgroundColor: colors.gray }}
        onAfterChange={(ageYearsOnly) => { handleChange(ageYearsOnly, ageMonthsOnly, preferPiaUserCalcValue) }}
      />

      <Slider
        style={{
          marginTop: 60,
          marginBottom: 60
        }}
        defaultValue={ageMonthsOnly}
        disabled={ ageYearsOnly === 70 ? true : false}
        min={0} max={11}
        marks=
        {{
          0: {
            label: <strong style={{ "fontSize": "18px" }}>0</strong>,
            style: {
              color: colors.black,
            }
          },
          [fullRetirementAgeMonthsOnly]: {
            label: <strong style={{ "fontSize": "18px" }}>FRA: {fullRetirementAgeMonthsOnly}</strong>,
            style: {
              color: colors.black,
            }
          },
          11: {
            label: <strong style={{ "fontSize": "18px" }}>11</strong>,
            style: {
              color: colors.black,
            }
          }
        }}
        step={1}
        trackStyle={{ backgroundColor: colors.gray }}
        handleStyle={{
          borderRadius: 0,
          height: 24,
          width: 15,
          marginTop: -10,
          backgroundColor: colors.purple,
          boxShadow: '0 0 0 0',
          borderColor: 'transparent'
        }}
        dotStyle={{ visibility: 'hidden' }}
        activeDotStyle={{ visibility: 'hidden' }}
        railStyle={{ backgroundColor: colors.gray }}
        onAfterChange={(ageMonthsOnly) => { handleChange(ageYearsOnly, ageMonthsOnly, preferPiaUserCalcValue) }}
      />
    </React.Fragment>
  )
}

export default AgeSlider