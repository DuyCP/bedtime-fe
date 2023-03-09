import React from 'react'
import { IIconProps } from './MicIcon'

const LoopIcon = (props: IIconProps) => {
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
        d='M3.57996 5.15997H17.42C19.08 5.15997 20.42 6.49997 20.42 8.15997V11.48'
        stroke={iconColor}
        strokeWidth='2'
        stroke-miterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.73996 2L3.57996 5.15997L6.73996 8.32001'
        stroke={iconColor}
        strokeWidth='2'
        stroke-miterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.42 18.84H6.57996C4.91996 18.84 3.57996 17.5 3.57996 15.84V12.52'
        stroke={iconColor}
        strokeWidth='2'
        stroke-miterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.26 22L20.42 18.84L17.26 15.68'
        stroke={iconColor}
        strokeWidth='2'
        stroke-miterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default LoopIcon
