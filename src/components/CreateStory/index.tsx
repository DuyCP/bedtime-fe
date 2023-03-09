import { Button, Grid, Select, Stack, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { VOICE_LIST } from '../../constants'
import MusicIcon from '../../icons/MusicIcon'
import { IAudioConfig } from '../Main'

interface IAudioConfigProps {
  audioConfig: IAudioConfig
  setAudioConfig: React.Dispatch<React.SetStateAction<IAudioConfig>>
}

const SPEED_OPTIONS = [0.5, 1.0, 1.5]

const CreateStory = (props: IAudioConfigProps): JSX.Element => {
  const { audioConfig, setAudioConfig } = props

  const [open, setOpen] = useState(false)

  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
      voice: VOICE_LIST[0].value,
      title: '',
      content: '',
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <Stack className='bg-gray-200' sx={{ gap: 0 }}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          {/* <Group position='right' mt='md'>
          <Button type='submit'>Submit</Button>
        </Group> */}

          <Grid.Col span={12}>
            <Select
              label='Chọn giọng đọc'
              defaultValue={VOICE_LIST[0].value}
              data={VOICE_LIST}
              // onChange={(e) =>
              //   setAudioConfig((prev) => ({
              //     ...prev,
              //     voice: e as string,
              //   }))
              // }
              // sx={{ width: '100%' }}
              {...form.getInputProps('voice')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label='Tiêu đề truyện'
              placeholder='Nhập tiêu đề'
              {...form.getInputProps('title')}
            />
          </Grid.Col>

          <Grid.Col span={12} pb={0}>
            <Textarea
              withAsterisk
              placeholder='Nhập nội dung...'
              label='Nội dung truyện'
              // ref={ref}
              autosize
              minRows={9}
              {...form.getInputProps('content')}
            />
          </Grid.Col>

          <Grid.Col span={12} pt={0}>
            <Button
              // disabled={mutation.isLoading}
              // onClick={() => handleTextToSpeech(getInputText())}
              sx={{
                width: '100%',
                marginTop: 10,
                backgroundColor: '#6741D9',
                color: 'white',
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: '#5d3bc3',
                },
              }}
            >
              Tạo mới
            </Button>
          </Grid.Col>
        </Grid>
      </form>

      <Button
        variant='subtle'
        leftIcon={<MusicIcon />}
        // disabled={mutation.isLoading}
        // onClick={() => handleTextToSpeech(getInputText())}
        sx={{
          marginTop: 10,
          borderRadius: 8,
          color: '#6741D9',
          '&:hover': {
            backgroundColor: '#f1edfd',
          },
        }}
      >
        Xem danh sách truyện đã tạo
      </Button>

      {/* <Grid.Col span={12}>
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
                    key={speed}
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
        </Grid.Col> */}

      {/* <Grid.Col span={6}>
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
        </Grid.Col> */}

      {/* <Grid.Col span={6}>
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
          </Grid.Col> */}

      {/* <Grid.Col span={6}>
            <Text mt='md' size='sm'>
              Sample Rate: {audioConfig.sampleRate}
            </Text>

            <Slider
              defaultValue={audioConfig.sampleRate}
              min={8}
              max={48}
              step={2}
              onChangeEnd={(value) => {
                setAudioConfig((prev) => ({
                  ...prev,
                  sampleRate: value,
                }))
              }}
            />
          </Grid.Col> */}
    </Stack>
  )
}

export default CreateStory
