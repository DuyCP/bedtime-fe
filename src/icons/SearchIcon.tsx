import React from 'react'

export interface IIconProps {
  color?: string
  secondaryColor?: string
}

const SearchIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = '#868E96'
  const iconColor = color || defaultColor

  return (
    <svg
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.58334 18C13.9556 18 17.5 14.4555 17.5 10.0833C17.5 5.71104 13.9556 2.16663 9.58334 2.16663C5.21109 2.16663 1.66668 5.71104 1.66668 10.0833C1.66668 14.4555 5.21109 18 9.58334 18Z'
        stroke={iconColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.3333 18.8333L16.6667 17.1666'
        stroke={iconColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default SearchIcon
