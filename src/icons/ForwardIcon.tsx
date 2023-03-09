import React from 'react'
import { IIconProps } from './MicIcon'

const ForwardIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = '#212529'
  const iconColor = color || defaultColor

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.76001 7.21999V16.79C3.76001 18.75 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.79998L11.74 7.39998L7.59 5.01C5.89 4.03 3.76001 5.24999 3.76001 7.21999Z'
        fill={iconColor}
        stroke={iconColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.24 18.18V5.82001'
        stroke={iconColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ForwardIcon
