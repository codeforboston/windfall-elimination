import React from 'react'
import Slider, { Range } from 'rc-slider';
import { colors } from '../constants'

const AgeSlider = ({testAge, handleRetireChange}) => {

  return (
    <Slider
      style = {{
        marginTop: 60,
        marginBottom: 60
      }}
      defaultValue = {testAge}
      min={62} max={70}
      marks=
      {{
        62:{
          label: <strong>62</strong>,
          style: {
            color: colors.black,
          }
        },
        70:{
          label: <strong>70</strong>,
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
      onAfterChange={handleRetireChange}
    />
  )
}

export default AgeSlider