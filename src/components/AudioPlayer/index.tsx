import { useEffect, useState } from 'react'

import { Howl, Howler } from 'howler'
import { Box, Button, Flex, Slider, Text } from '@mantine/core'
import { AiFillPlayCircle } from 'react-icons/ai'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { MdPauseCircleFilled } from 'react-icons/md'

const playIconProps = { size: 80, color: 'white', style: { cursor: 'pointer' } }

const marks = [
  { value: 20, label: '20%' },
  { value: 50, label: '50%' },
  { value: 80, label: '80%' },
]

const AudioPlayer = (props) => {
  const { audio } = props

  const [sound, setSound] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [val, setVal] = useState(30)

  const canPlay = audio !== null && audio !== ''

  useEffect(() => {
    // Initialize Howler.js
    Howler.autoUnlock = false
    // Create a new Howl object from the Audio object
    // const bytes = atob( props.audio.split(',')[1]);
    // const buffer = new Uint8Array(bytes.length);
    // for (let i = 0; i < bytes.length; i++) {
    //   buffer[i] = bytes.charCodeAt(i);
    // }
    // const blob = new Blob([buffer], { type: 'audio/wav' });
    // const url = URL.createObjectURL(blob);

    // create a new Howl object with the audio data
    // this.sound = new Howl({
    //   src: [url],
    //   format: ['wav'],
    //   onload: () => {
    //     this.setState({ loaded: true });
    //   }
    // });

    setSound(new Howl({ src: props.audio }))
  }, [audio])

  const handlePlay = () => {
    if (!canPlay) return
    setIsPlaying(true)
    if (sound && !sound.playing()) {
      sound.play()
    }
  }

  const handlePause = () => {
    if (sound && sound.playing()) {
      sound.pause()
    }
    setIsPlaying(false)
  }

  const handleStop = () => {
    if (sound) {
      sound.stop()
    }
  }

  const noAudio = audio === null || audio === ''

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        width: '100%',
        height: '200px',
        marginInline: 'auto',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <Flex justify='center' align='center' gap={10}>
        <BiSkipPrevious {...playIconProps} size={40} />
        <Box>
          {isPlaying ? (
            <MdPauseCircleFilled
              {...playIconProps}
              onClick={handlePause}
              style={{ opacity: canPlay ? 1 : 0.5 }}
            />
          ) : (
            <AiFillPlayCircle
              {...playIconProps}
              style={{ opacity: canPlay ? 1 : 0.5 }}
              onClick={handlePlay}
              // style={{ opacity: 0.5 }}
            />
          )}
        </Box>
        <BiSkipNext
          {...playIconProps}
          size={40}
          style={{ opacity: canPlay ? 1 : 0.5 }}
        />
      </Flex>

      <Box mb={10} mt={10}>
        <Slider
          defaultValue={0}
          value={val}
          labelTransition='fade'
          size={2}
          label={null}
          styles={(theme) => ({
            track: {
              height: 5,
              backgroundColor: 'gray',
            },
            mark: {
              width: 6,
              height: 6,
              borderRadius: 6,
              transform: 'translateX(-3px) translateY(-2px)',
              borderColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[3]
                  : theme.colors.blue[1],
            },
            markFilled: {
              borderColor: theme.colors.blue[6],
            },
            markLabel: {
              fontSize: theme.fontSizes.xs,
              marginBottom: 5,
              marginTop: 0,
            },
            thumb: {
              height: 16,
              width: 16,
              backgroundColor: theme.white,
              borderWidth: 1,
              boxShadow: theme.shadows.sm,
            },
          })}
        />
      </Box>

      <Flex gap={4} sx={{ marginInline: 'auto', width: 'fit-content' }}>
        <Text size='sm'>02:10</Text>
        <Text size='sm'>/</Text>
        <Text size='sm'>03:00</Text>
      </Flex>
    </Box>
  )
}

export default AudioPlayer
