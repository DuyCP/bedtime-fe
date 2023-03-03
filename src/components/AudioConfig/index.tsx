import {
  Box,
  Chip,
  Collapse,
  Flex,
  Grid,
  MultiSelect,
  Select,
  Slider,
  Stack,
  Text,
} from '@mantine/core'
import { useState } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { effectsProfileIdList, IAudioConfig, voiceList } from '../../App'
import { GENDER } from '../../enums'

interface IAudioConfigProps {
  audioConfig: IAudioConfig
  setAudioConfig: React.Dispatch<React.SetStateAction<IAudioConfig>>
}

const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1.0, 1.5, 1.75, 2, 3, 4]

const AudioConfig = (props: IAudioConfigProps): JSX.Element => {
  const { audioConfig, setAudioConfig } = props

  const [open, setOpen] = useState(true)

  return (
    <Stack className='bg-gray-200' spacing={20}>
      <Flex
        justify='space-between'
        align='center'
        onClick={() => setOpen((o) => !o)}
      >
        <Flex align='center' gap={4} sx={{ cursor: 'pointer' }}>
          <IoMdSettings size={20} />
          <Text>Settings</Text>
        </Flex>

        <Box sx={{ cursor: 'pointer' }}>
          {open ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
        </Box>
      </Flex>

      <Collapse in={open}>
        <Grid>
          <Grid.Col span={6}>
            <Select
              label='Voice'
              defaultValue={voiceList[0].value}
              data={voiceList}
              onChange={(e) =>
                setAudioConfig((prev) => ({
                  ...prev,
                  voice: e as string,
                }))
              }
              sx={{ width: 200 }}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <MultiSelect
              data={effectsProfileIdList}
              label='Effects profile ID'
              placeholder='Pick one or multiple'
              // onSelect={(e) => console.log(e)}
              onChange={(e) =>
                setAudioConfig((prev) => ({
                  ...prev,
                  effectsProfileId: e,
                }))
              }
              sx={{ width: 250 }}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Text mt='md' size='sm' mb={4}>
              Speed
            </Text>

            <Box>
              <Chip.Group
                position='left'
                onChange={(newSpeed) =>
                  setAudioConfig((prev) => ({
                    ...prev,
                    speed: parseFloat(newSpeed as string),
                  }))
                }
              >
                {SPEED_OPTIONS.map((speed) => {
                  const isActive = audioConfig.speed === speed
                  return (
                    <Chip
                      value={speed}
                      size='xs'
                      checked={isActive}
                      variant={isActive ? 'filled' : 'outline'}
                    >
                      {speed}
                    </Chip>
                  )
                })}
              </Chip.Group>
            </Box>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text mt='md' size='sm'>
              Pitch: {audioConfig.pitch}
            </Text>

            <Slider
              defaultValue={audioConfig.pitch}
              onChangeEnd={(value) => {
                setAudioConfig((prev) => ({
                  ...prev,
                  pitch: value,
                }))
              }}
              min={-20}
              max={20}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Text mt='md' size='sm'>
              Volume Gain: {audioConfig.volumeGain}
            </Text>

            <Slider
              defaultValue={audioConfig.volumeGain}
              min={-96}
              max={16}
              step={2}
              onChangeEnd={(value) => {
                setAudioConfig((prev) => ({
                  ...prev,
                  volumeGain: value,
                }))
              }}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Text mt='md' size='sm'>
              Sample Rate: {audioConfig.sampleRate}
            </Text>

            <Slider
              defaultValue={audioConfig.sampleRate}
              min={8_000}
              max={48_000}
              step={500}
              onChangeEnd={(value) => {
                setAudioConfig((prev) => ({
                  ...prev,
                  sampleRate: value,
                }))
              }}
            />
          </Grid.Col>
        </Grid>
      </Collapse>
    </Stack>
  )
}

export default AudioConfig
