import React from 'react'
import { IIconProps } from './MicIcon'

const PreviousIcon = (props: IIconProps) => {
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
        d='M20.24 7.21999V16.79C20.24 18.75 18.11 19.98 16.41 19L12.26 16.61L8.10999 14.21C6.40999 13.23 6.40999 10.78 8.10999 9.79998L12.26 7.39998L16.41 5.01C18.11 4.03 20.24 5.24999 20.24 7.21999Z'
        fill={iconColor}
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3.76001 18.18V5.82001'
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default PreviousIcon
