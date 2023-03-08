import React from 'react'
import { IIconProps } from './MicIcon'

const NoteIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = '#6741D9'
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
        d='M22.41 10.44L21.43 14.62C20.59 18.23 18.93 19.69 15.81 19.39C15.31 19.35 14.77 19.26 14.19 19.12L12.51 18.72C8.34 17.73 7.05 15.67 8.03 11.49L9.01 7.30001C9.21 6.45001 9.45 5.71001 9.75 5.10001C10.92 2.68001 12.91 2.03001 16.25 2.82001L17.92 3.21001C22.11 4.19001 23.39 6.26001 22.41 10.44Z'
        stroke='#6741D9'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M15.81 19.39C15.19 19.81 14.41 20.16 13.46 20.47L11.88 20.99C7.91001 22.27 5.82001 21.2 4.53001 17.23L3.25001 13.28C1.97001 9.30998 3.03001 7.20998 7.00001 5.92998L8.58001 5.40998C8.99001 5.27998 9.38001 5.16998 9.75001 5.09998C9.45001 5.70998 9.21001 6.44998 9.01001 7.29998L8.03001 11.49C7.05001 15.67 8.34001 17.73 12.51 18.72L14.19 19.12C14.77 19.26 15.31 19.35 15.81 19.39Z'
        stroke='#6741D9'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.39 8.53003L18.24 9.76003'
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12.41 12.4L15.31 13.14'
        stroke={iconColor}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default NoteIcon
