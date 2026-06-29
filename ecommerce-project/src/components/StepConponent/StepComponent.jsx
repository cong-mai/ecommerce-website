import React from 'react'
import { CustomSteps } from './styled';

const StepComponent = ({ current = 0, items = [] }) => {
  return (
    <CustomSteps current={current} items={items} />
  )
}

export default StepComponent
