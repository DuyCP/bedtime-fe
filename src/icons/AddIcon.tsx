import React from 'react'
import { IIconProps } from './MicIcon'

const AddIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = '#212529'
  const iconColor = color || defaultColor

  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.25 12H18.25'
        stroke={iconColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.25 18V6'
        stroke={iconColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default AddIcon
