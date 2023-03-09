import React, { forwardRef, useEffect, useRef } from 'react'

import { Box, Loader } from '@mantine/core'
import ReactH5AudioPlayer from 'react-h5-audio-player'
import ForwardIcon from '../../icons/ForwardIcon'
import LoopIcon from '../../icons/LoopIcon'
import PauseIcon from '../../icons/PauseIcon'
import PlayIcon from '../../icons/PlayIcon'
import PreviousIcon from '../../icons/PreviousIcon'

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
    <Box sx={{ position: 'relative' }}>
      <ReactH5AudioPlayer
        customIcons={{
          pause: <PauseIcon color='#ffffff' secondaryColor='#6741D9' />,
          play: <PlayIcon color='#ffffff' secondaryColor='#6741D9' />,
          previous: <PreviousIcon />,
          next: <ForwardIcon />,
          // loop: <LoopIcon />,
        }}
        showSkipControls={true}
        showJumpControls={false}
        ref={ref as any}
        style={{ backgroundColor: '#25262b', color: 'red', marginTop: 28 }}
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
