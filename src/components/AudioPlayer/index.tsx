import { Box, Loader } from '@mantine/core'
import React from 'react'
import ReactH5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './custom.css'

interface IProps {
  audio?: string
  loading: boolean
}

const TestPlayer2 = (props: IProps) => {
  const { audio, loading = false } = props

  return (
    <Box mb={40}>
      <Box mx='auto' mb={10} sx={{ height: 30, width: 'fit-content' }}>
        {loading && (
          <Loader size='md' variant='bars' color='#dddddd80' mx='auto' />
        )}
      </Box>

      <ReactH5AudioPlayer
        style={{ backgroundColor: '#25262b', color: 'red' }}
        src={audio}
        autoPlayAfterSrcChange={false}
        onPlay={() => console.log('onPlay')}
      />
    </Box>
  )
}

export default TestPlayer2
