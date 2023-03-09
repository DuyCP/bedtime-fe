import { Box, Loader } from '@mantine/core'
import React, { forwardRef } from 'react'
import ReactH5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './custom.css'

interface IProps {
  audio?: string
  loading: boolean
  setIsPlaying: any
}

const AudioPlayer = forwardRef((props: IProps, ref) => {
  const { audio, setIsPlaying, loading = false } = props

  return (
    <Box mb={40}>
      <ReactH5AudioPlayer
        ref={ref}
        style={{ backgroundColor: '#25262b', color: 'red' }}
        src={audio}
        autoPlayAfterSrcChange={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <Box mx='auto' mt={10} sx={{ height: 30, width: 'fit-content' }}>
        {loading && <Loader size='sm' variant='bars' color='#6741D9' />}
      </Box>
    </Box>
  )
})

export default AudioPlayer
