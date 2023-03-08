import React from 'react'
import { IIconProps } from './MicIcon'

const PauseIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = '#6741D9'
  const iconColor = color || defaultColor

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.2125 11.1475V2.8525C6.2125 2.065 5.88 1.75 5.04 1.75H2.9225C2.0825 1.75 1.75 2.065 1.75 2.8525V11.1475C1.75 11.935 2.0825 12.25 2.9225 12.25H5.04C5.88 12.25 6.2125 11.935 6.2125 11.1475Z" fill={iconColor}/>
<path d="M12.2502 11.1475V2.8525C12.2502 2.065 11.9177 1.75 11.0777 1.75H8.96016C8.12599 1.75 7.78766 2.065 7.78766 2.8525V11.1475C7.78766 11.935 8.12016 12.25 8.96016 12.25H11.0777C11.9177 12.25 12.2502 11.935 12.2502 11.1475Z" fill={iconColor}/>
</svg>

  )
}

export default PauseIcon
