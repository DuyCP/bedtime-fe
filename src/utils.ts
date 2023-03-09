import { S3_URL } from './constants'

export const formatSeconds = (seconds: number) => {
  let minutes = Math.floor(seconds / 60)
  seconds = seconds % 60
  return (
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')
  )
}

export const shortenText = (longText: string, numberOfWord: number) => {
  return longText.split(' ').slice(0, numberOfWord).join(' ')
}

export const getS3Url = (str: string) => `${S3_URL}/${str}`

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const minuteString = `${minutes < 10 ? '0' : ''}${minutes}`
  const secondString = `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`

  if (minutes === 0) {
    return `${secondString} giây`
  }
  return `${minuteString} phút ${secondString} giây`
}
