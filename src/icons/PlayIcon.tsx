import React from 'react'
import { IIconProps } from './MicIcon'

const PlayIcon = (props: IIconProps) => {
  const { color, secondaryColor } = props
  const defaultColor = 'white'
  const defaultSecondaryColor = '#212529'
  const iconColor = color || defaultColor
  const iconSecondaryColor = secondaryColor || defaultSecondaryColor

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="15" fill={iconSecondaryColor}/>
    <path d="M10.3333 15V12.9233C10.3333 10.345 12.1592 9.28915 14.3933 10.5783L16.1958 11.6166L17.9983 12.655C20.2325 13.9441 20.2325 16.0558 17.9983 17.345L16.1958 18.3833L14.3933 19.4216C12.1592 20.7108 10.3333 19.655 10.3333 17.0766V15Z" fill={iconColor}/>
    </svg>
    
  )
}

export default PlayIcon
