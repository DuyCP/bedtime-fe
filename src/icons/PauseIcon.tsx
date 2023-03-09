import React from 'react'
import { IIconProps } from './MicIcon'

const PauseIcon = (props: IIconProps) => {
  const { color, secondaryColor } = props
  const defaultColor = 'white'
  const defaultSecondaryColor = '#212529'
  const iconColor = color || defaultColor
  const iconSecondaryColor = secondaryColor || defaultSecondaryColor

  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='30' height='30' rx='15' fill={iconSecondaryColor} />
      <path
        d='M14.2125 19.1475V10.8525C14.2125 10.065 13.88 9.75 13.04 9.75H10.9225C10.0825 9.75 9.75 10.065 9.75 10.8525V19.1475C9.75 19.935 10.0825 20.25 10.9225 20.25H13.04C13.88 20.25 14.2125 19.935 14.2125 19.1475Z'
        fill={iconColor}
      />
      <path
        d='M20.2502 19.1475V10.8525C20.2502 10.065 19.9177 9.75 19.0777 9.75H16.9602C16.126 9.75 15.7877 10.065 15.7877 10.8525V19.1475C15.7877 19.935 16.1202 20.25 16.9602 20.25H19.0777C19.9177 20.25 20.2502 19.935 20.2502 19.1475Z'
        fill={iconColor}
      />
    </svg>
  )
}

export default PauseIcon
