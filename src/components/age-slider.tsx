import React from 'react'
import Slider from 'rc-slider';
import { colors } from '../constants'

const defaultFRA = () => {
  console.warn("That is odd: You used default Full Retirement Age in slider");
  return 67;
}

const AgeSlider = ({age, handleChange, fullRetirementAge = defaultFRA()}) => {
  return (
    <Slider
      style = {{
        marginTop: 60,
        marginBottom: 60
      }}
      defaultValue = {age}
      min={62} max={70}
      marks=
      {{
        62:{
          label: <strong style={{"fontSize": "18px"}}>62</strong>,
          style: {
            color: colors.black,
          }
        },
        [fullRetirementAge]: {
          label: <strong style={{"fontSize": "18px"}}>FRA: {fullRetirementAge.toFixed(2)}</strong>,
          style: {
            color: colors.black,
          }
        },
        70:{
          label: <strong style={{"fontSize": "18px"}}>70</strong>,
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
      onAfterChange={handleChange}
    />
  )
}

export default AgeSlider