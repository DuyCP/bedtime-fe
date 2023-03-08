import React from 'react'

export interface IIconProps {
  color?: string
  secondaryColor?: string
}

const HomeIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = '#6741D9'
  const iconColor = color || defaultColor

  return (
    <svg
      width='21'
      height='21'
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.05834 2.85004L3.28334 7.47504C2.63334 7.9917 2.21667 9.08337 2.35834 9.90004L3.46667 16.5334C3.66667 17.7167 4.8 18.675 6 18.675H15.3333C16.525 18.675 17.6667 17.7084 17.8667 16.5334L18.975 9.90004C19.1083 9.08337 18.6917 7.9917 18.05 7.47504L12.275 2.85837C11.3833 2.1417 9.94167 2.1417 9.05834 2.85004Z'
        fill={iconColor}
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M10.6667 15.5V13'
        stroke='white'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default HomeIcon
