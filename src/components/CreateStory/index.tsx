import {
  Button,
  Flex,
  Grid,
  Group,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { UseMutateFunction } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { MAX_STORY_CHARS, VOICE_LIST } from '../../constants'
import MicIcon from '../../icons/MicIcon'
import MusicIcon from '../../icons/MusicIcon'
import { IAudioConfig } from '../Main'

interface IAudioConfigProps {
  audioConfig: IAudioConfig
  isLoading: boolean
  generateAudio: UseMutateFunction<void, unknown, IAudioConfig, unknown>
  setAudioConfig: React.Dispatch<React.SetStateAction<IAudioConfig>>
}

const CreateStory = (props: IAudioConfigProps): JSX.Element => {
  const { audioConfig, isLoading, setAudioConfig, generateAudio } = props
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      voice: VOICE_LIST[0].value,
      title: '',
      content: '',
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      title: (value) => (value ? null : 'Hãy điền tiêu đề'),
      content: (value) => (value ? null : 'Hãy điền nội dung'),
    },
  })

  const recordVoice = () => {
    console.log('RECORD VOICE')
  }

  const onSubmit = (values: {
    voice: string
    title: string
    content: string
  }) => {
    generateAudio({ ...audioConfig, ...values })
    setAudioConfig((prev) => ({ ...prev, ...values }))
  }

  return (
    <Stack className='bg-gray-200' sx={{ gap: 0 }}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Grid gutter='xs'>
          <Grid.Col span={10}>
            <Select
              label='Chọn giọng đọc'
              defaultValue={VOICE_LIST[0].value}
              data={VOICE_LIST}
              {...form.getInputProps('voice')}
            />
          </Grid.Col>

          <Grid.Col span={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Flex
              onClick={recordVoice}
              align='center'
              justify='center'
              bg='#F03E3E'
              sx={{
                borderRadius: 10,
                width: 40,
                height: 40,
                cursor: 'pointer',
              }}
            >
              <Group position='center' sx={{ transform: 'scale(0.8)' }}>
                <MicIcon color='white' />
              </Group>
            </Flex>
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
              maxLength={MAX_STORY_CHARS}
              autosize
              minRows={9}
              maxRows={9}
              {...form.getInputProps('content')}
            />
          </Grid.Col>

          <Grid.Col span={12} pt={0}>
            <Button
              disabled={isLoading}
              // onClick={() => handleTextToSpeech(getInputText())}
              type='submit'
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
        onClick={() => navigate('/my-stories')}
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
