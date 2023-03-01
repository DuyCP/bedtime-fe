import React, { useState, useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player'

const AudioPlayer2 = ({ base64Data }) => {
  const [audioSrc, setAudioSrc] = useState(null)

  useEffect(() => {
    if (base64Data) {
      const audioBlob = b64toBlob(base64Data)
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioSrc(audioUrl)
    }
  }, [base64Data])

  function b64toBlob(base64Data, contentType = '') {
    const sliceSize = 512
    const byteCharacters = window.atob(base64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = new Array(slice.length)

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
  }

  return (
    <>
      {audioSrc ? (
        <ReactAudioPlayer src={audioSrc} autoPlay={false} controls />
      ) : (
        <p>No audio data found.</p>
      )}
    </>
  )
}

export default AudioPlayer2
