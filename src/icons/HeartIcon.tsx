import React from 'react'
import { IIconProps } from './MicIcon'

const HeartIcon = (props: IIconProps) => {
  const { color } = props
  const defaultColor = 'black'
  const iconColor = color || defaultColor

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5167 17.3416C10.2333 17.4416 9.76667 17.4416 9.48334 17.3416C7.06667 16.5166 1.66667 13.075 1.66667 7.24165C1.66667 4.66665 3.74167 2.58331 6.30001 2.58331C7.81667 2.58331 9.15834 3.31665 10 4.44998C10.8417 3.31665 12.1917 2.58331 13.7 2.58331C16.2583 2.58331 18.3333 4.66665 18.3333 7.24165C18.3333 13.075 12.9333 16.5166 10.5167 17.3416Z" stroke={iconColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  )
}

export default HeartIcon
