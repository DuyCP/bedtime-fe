import {
  Box,
  Button,
  Flex,
  MantineProvider,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { BiCustomize } from 'react-icons/bi'
import { BsMusicNoteList } from 'react-icons/bs'
import { useMutation, useQuery } from 'react-query'
import './App.css'
import AudioConfig from './components/AudioConfig'
import AudioPlayer from './components/AudioPlayer'
import StoryItem from './components/StoryItem'
import TextInput from './components/TextInput'
import { GENDER, PROVIDER } from './enums'

const BASE_URL = 'http://localhost:3000/api'
const GOOGLE_ENDPOINT = `${BASE_URL}/tts/google`
const AZURE_ENDPOINT = `${BASE_URL}/tts/azure`

const getEndpoint = (provider: string) => {
  switch (provider) {
    case PROVIDER.GOOGLE:
    default: {
      return GOOGLE_ENDPOINT
    }
    case PROVIDER.AZURE: {
      return AZURE_ENDPOINT
    }
  }
}

export interface IAudioConfig {
  speed: number
  pitch: number
  volumeGain: number
  sampleRate: number
  provider: string
  voice: string
  effectsProfileId: string[]
}

const STORY_LIST = [
  {
    name: 'Sự tích sọ dừa 1',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
  {
    name: 'Sự tích sọ dừa 2',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
  {
    name: 'Sự tích sọ dừa 3',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
  {
    name: 'Sự tích sọ dừa 4',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
  {
    name: 'Sự tích sọ dừa 5',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
  {
    name: 'Sự tích sọ dừa 6',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
  {
    name: 'Sự tích sọ dừa 7',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
  {
    name: 'Sự tích sọ dừa 8',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
  {
    name: 'Sự tích sọ dừa 9',
    type: 'Cổ tích Việt Nam',
    length: '04:20',
  },
]

const EFFECTS_PROFILE_ID = [
  'wearable-class-device',
  'handset-class-device',
  'headphone-class-device',
  'small-bluetooth-speaker-class-device',
  'medium-bluetooth-speaker-class-device',
  'large-home-entertainment-class-device',
  'large-automotive-class-device',
  'telephony-class-application',
]

const { MALE, FEMALE } = GENDER
export const VOICES = [
  { gender: FEMALE, name: 'vi-VN-Standard-A' },
  { gender: MALE, name: 'vi-VN-Standard-B' },
  { gender: FEMALE, name: 'vi-VN-Standard-C' },
  { gender: FEMALE, name: 'vi-VN-Standard-D' },
  { gender: FEMALE, name: 'vi-VN-Wavenet-A' },
  { gender: FEMALE, name: 'vi-VN-Wavenet-B' },
  { gender: FEMALE, name: 'vi-VN-Wavenet-C' },
  { gender: MALE, name: 'vi-VN-Wavenet-D' },
]
export const voiceList = VOICES.map((voice) => ({
  value: voice.name,
  label: voice.name,
  group: voice.gender,
}))
export const effectsProfileIdList = EFFECTS_PROFILE_ID.map((voice) => ({
  value: voice,
  label: voice,
}))

const App = () => {
  const [provider, setProvider] = useState(PROVIDER.GOOGLE)
  const [audioConfig, setAudioConfig] = useState<IAudioConfig>({
    speed: 1,
    pitch: 0,
    volumeGain: 0,
    sampleRate: 20,
    provider: PROVIDER.GOOGLE,
    voice: voiceList[0].value,
    effectsProfileId: [],
  })

  const [audio, setAudio] = useState<null | string>('')
  const [selectedStory, setSelectedStory] = useState({
    _id: 0,
    index: -1,
    title: '',
    content: '',
  })
  const inputRef = useRef()

  const mutation = useMutation((text) =>
    fetch(getEndpoint(provider), {
      method: 'POST',
      body: JSON.stringify({
        input: { text },
        voice: {
          name: audioConfig.voice,
        },
        audioConfig: {
          pitch: audioConfig.pitch,
          volumeGainDb: audioConfig.volumeGain,
          effectsProfileId: audioConfig.effectsProfileId,
          speakingRate: audioConfig.speed,
          // sampleRateHertz: audioConfig.sampleRate,
        },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.blob())
      .then((url) => {
        const reader = new FileReader()
        reader.readAsDataURL(url)
        reader.onloadend = () => {
          const audioData = reader.result as string
          setAudio(audioData)
        }
      })
      .catch((error) => console.error(error))
  )

  const {
    error: getStoriesError,
    data: stories = [],
    isLoading: getStoriesLoading,
    refetch,
  } = useQuery(
    'stories',
    async () => {
      const params = {
        page: 1,
        limit: 10,
      }
      const queryParams = new URLSearchParams(params as any).toString()

      const response = await fetch(`${BASE_URL}/stories?${queryParams}`)
      const responseData = await response.json()
      const storyList = responseData.stories.stories

      const promises = storyList.map(async (story, index) => {
        const detailResponse = await fetch(`${BASE_URL}/story/${story._id}`)
        const detail = await detailResponse.json()
        return { ...detail.story, index }
      })

      const storiesWithDetail = await Promise.all(promises)
      return storiesWithDetail
    },
    { enabled: false }
  )

  useEffect(() => {
    refetch()
  }, [])

  if (mutation.error)
    return `An error occurred: ${(mutation.error as any).message}`

  const handleTextToSpeech = async (text: string) => {
    if (!text) {
      console.log('Error: Empty text')
      return
    }
    const shortenedText = text.slice(0, 500)
    await mutation.mutate(shortenedText)
    // await mutation.mutate(text)
  }

  const getInputText = () => {
    if (!inputRef || !inputRef.current) return ''
    return (inputRef.current as any).value
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Open Sans, sans serif',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
    >
      <Box
        className='App'
        py={20}
        sx={{
          backgroundImage:
            // 'url("https://images.unsplash.com/photo-1528818955841-a7f1425131b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RhcnJ5JTIwc2t5fGVufDB8fDB8fA%3D%3D&w=1000&q=80")',
            'url("https://images.pexels.com/photos/9474172/pexels-photo-9474172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        }}
      >
        <Title order={1} align='center' mb={40}>
          Bedtime Stories
        </Title>

        <Stack sx={{ maxWidth: 600, marginInline: 'auto', gap: 70 }}>
          <Flex sx={{ width: '100%', marginInline: 'auto' }} gap={20}>
            <Tabs defaultValue='story' sx={{ width: '100%' }}>
              <Tabs.List>
                <Tabs.Tab
                  value='story'
                  icon={<BsMusicNoteList size='0.8rem' />}
                  sx={{ fontSize: 12, width: '50%' }}
                >
                  STORY LIST
                </Tabs.Tab>
                <Tabs.Tab
                  value='custom'
                  icon={<BiCustomize size='0.8rem' />}
                  sx={{ fontSize: 12, width: '50%' }}
                >
                  CUSTOM
                </Tabs.Tab>
              </Tabs.List>

              {/* Story List */}
              <Tabs.Panel value='story' pt='xs'>
                <Box
                  id='story-list'
                  sx={{
                    height: 400,
                    overflowY: 'scroll',
                  }}
                >
                  {getStoriesLoading ? (
                    <Text>Loading stories ...</Text>
                  ) : (
                    stories.map((story, index) => (
                      <Box key={index} sx={{ marginBottom: 10 }}>
                        <StoryItem
                          isActive={
                            selectedStory.index === index ||
                            selectedStory._id === story._id
                          }
                          story={story}
                          onSelect={setSelectedStory}
                        />
                      </Box>
                    ))
                  )}
                </Box>
              </Tabs.Panel>

              {/* Custom Input */}
              <Tabs.Panel value='custom' pt='xs'>
                <Box sx={{ height: 400 }}>
                  <TextInput minRows={15} ref={inputRef} />
                  <Box sx={{ height: 20 }} />
                </Box>
              </Tabs.Panel>
            </Tabs>
          </Flex>

          <AudioConfig
            audioConfig={audioConfig}
            setAudioConfig={setAudioConfig}
          />

          <Stack>
            <>
              <Button
                disabled={mutation.isLoading}
                onClick={() =>
                  handleTextToSpeech(getInputText() || selectedStory.content)
                }
                sx={{ width: 'fit-content', marginLeft: 'auto' }}
              >
                Convert to Speech
              </Button>

              <AudioPlayer audio={audio} />

              {mutation.error && (
                <Text size='sm' color='red'>
                  An error occurred: ${(mutation.error as any).message}
                </Text>
              )}
            </>
          </Stack>
        </Stack>
        <Box>
          {/* {audio !== '' && !mutation.isLoading && <AudioPlayer audio={audio} />} */}
        </Box>
      </Box>
    </MantineProvider>
  )
}

export default App
