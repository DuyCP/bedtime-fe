import { useEffect, useState } from 'react'

import { Howl, Howler } from 'howler'
import { Box, Button, Flex, Slider, Text } from '@mantine/core'
import { AiFillPlayCircle } from 'react-icons/ai'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { MdPauseCircleFilled } from 'react-icons/md'

const playIconProps = (disabled?: boolean) => {
  return {
    size: 80,
    color: 'white',
    style: { cursor: 'pointer', opacity: !!disabled ? 0.5 : 1 },
  }
}

const AudioPlayer = (props: any) => {
  const { audio } = props

  const [sound, setSound] = useState<any>(null)
  const [soundId, setSoundId] = useState(0)
  const [time, setTime] = useState({ current: 0, duration: 0 })
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const canPlay = audio !== null && audio !== ''

  useEffect(() => {
    if (!audio) return

    setIsPlaying(false)
    if (sound) {
      sound.pause()
    }

    // Initialize Howler.js
    const soundObj = new Howl({
      src: props.audio,
      onplay: () => {
        console.log('duration', sound.duration())
      },
      onseek: () => {
        console.log('Here')
        setCurrentTime(sound.seek())
        const progressVal = (sound.seek() / time.duration) * 100
        setProgress(progressVal)
      },
    })
    setSound(soundObj)
  }, [audio])

  const handlePlay = () => {
    if (!canPlay) return
    setIsPlaying(true)
    if (sound && !sound.playing()) {
      const id = sound.play()
      const dur = sound.duration(id)
      setSoundId(id)
      setTime((prev) => ({ ...prev, duration: dur }))
      const progressVal = (sound.seek(id) / time.duration) * 100
      setProgress(progressVal)
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

  const getDurationInFormat = (seconds: number) => {
    return Math.ceil(seconds)
    // return Math.ceil(seconds/60)
  }

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
        <BiSkipPrevious
          {...playIconProps()}
          size={40}
          style={{ opacity: canPlay ? 1 : 0.5 }}
        />
        <Box>
          {isPlaying ? (
            <MdPauseCircleFilled
              {...playIconProps(!canPlay)}
              onClick={handlePause}
            />
          ) : (
            <AiFillPlayCircle
              {...playIconProps(!canPlay)}
              onClick={handlePlay}
            />
          )}
        </Box>
        <BiSkipNext
          {...playIconProps()}
          size={40}
          style={{ opacity: canPlay ? 1 : 0.5 }}
        />
      </Flex>

      <Box mb={10} mt={10}>
        <Slider
          value={progress}
          max={100}
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
        <Text size='sm'>
          {time.duration ? getDurationInFormat(sound.seek()) : '--'}
        </Text>
        <Text size='sm'>/</Text>
        <Text size='sm'>
          {time.duration ? getDurationInFormat(time.duration) : '--'}
        </Text>
      </Flex>
    </Box>
  )
}

export default AudioPlayer
