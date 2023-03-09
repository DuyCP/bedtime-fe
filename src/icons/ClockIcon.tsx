import React from 'react'
import { IIconProps } from './MicIcon'

const ClockIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = 'white'
  const iconColor = color || defaultColor

  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.5 9C16.5 13.14 13.14 16.5 9 16.5C4.86 16.5 1.5 13.14 1.5 9C1.5 4.86 4.86 1.5 9 1.5C13.14 1.5 16.5 4.86 16.5 9Z'
        stroke={iconColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.7825 11.3849L9.4575 9.99745C9.0525 9.75745 8.7225 9.17995 8.7225 8.70745V5.63245'
        stroke={iconColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ClockIcon
