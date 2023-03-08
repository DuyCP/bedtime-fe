import React from 'react'

export interface IIconProps {
  color?: string
  secondaryColor?:string
}

const MicIcon = (props: IIconProps) => {
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
        d='M12.75 15.5C14.96 15.5 16.75 13.71 16.75 11.5V6C16.75 3.79 14.96 2 12.75 2C10.54 2 8.75 3.79 8.75 6V11.5C8.75 13.71 10.54 15.5 12.75 15.5Z'
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5.1 9.65002V11.35C5.1 15.57 8.53 19 12.75 19C16.97 19 20.4 15.57 20.4 11.35V9.65002'
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M11.36 6.43C12.26 6.1 13.24 6.1 14.14 6.43'
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M11.95 8.55001C12.48 8.41001 13.03 8.41001 13.56 8.55001'
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12.75 19V22'
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default MicIcon
