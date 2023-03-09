import React from 'react'
import { IIconProps } from './MicIcon'

const MusicIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = '#6741D9'
  const iconColor = color || defaultColor

  return (
    <svg
      width='19'
      height='18'
      viewBox='0 0 19 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.25 16.5H5.75C3.5 16.5 2 15.375 2 12.75V9C2 6.375 3.5 5.25 5.75 5.25H13.25C15.5 5.25 17 6.375 17 9V12.75C17 15.375 15.5 16.5 13.25 16.5Z'
        stroke={iconColor}
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5 3.375H14'
        stroke={iconColor}
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.25 1.5H11.75'
        stroke={iconColor}
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.16751 14.3325C7.73498 14.3325 8.19501 13.8724 8.19501 13.305C8.19501 12.7375 7.73498 12.2775 7.16751 12.2775C6.60004 12.2775 6.14001 12.7375 6.14001 13.305C6.14001 13.8724 6.60004 14.3325 7.16751 14.3325Z'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.96 12.6225V8.60996C11.96 7.75496 11.4275 7.63498 10.88 7.78498L8.82498 8.34748C8.44998 8.45248 8.19501 8.74496 8.19501 9.17246V9.88497V10.365V13.305'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.9325 13.65C11.4999 13.65 11.96 13.1899 11.96 12.6225C11.96 12.055 11.4999 11.595 10.9325 11.595C10.365 11.595 9.90497 12.055 9.90497 12.6225C9.90497 13.1899 10.365 13.65 10.9325 13.65Z'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.19501 10.3725L11.96 9.34497'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default MusicIcon
