import React from 'react'
import ReactH5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './custom.css'

interface IProps {
  audioData: string
}

const TestPlayer2 = (props: IProps) => {
  const { audioData } = props

  const audio = new Audio(audioData)

  return (
    <ReactH5AudioPlayer
      style={{ backgroundColor: '#25262b', color: 'red' }}
      src={audioData}
      autoPlayAfterSrcChange={false}
      onPlay={() => console.log('onPlay')}
    />
  )
}

export default TestPlayer2
