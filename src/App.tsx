import { useEffect, useRef, useState } from 'react'

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
import { BiCustomize } from 'react-icons/bi'
import { BsMusicNoteList } from 'react-icons/bs'
import { useMutation, useQuery } from 'react-query'
import AudioConfig from './components/AudioConfig'
import TestPlayer2 from './components/AudioPlayer/TestPlayer2'
import StoryItem, { IStory } from './components/StoryItem'
import TextInput from './components/TextInput'
import { GENDER, PROVIDER } from './enums'

import './App.css'
import { shortenText } from './utils'

const BASE_URL = import.meta.env.VITE_BASE_URL
const GOOGLE_ENDPOINT = `${BASE_URL}/tts/google`
const AZURE_ENDPOINT = `${BASE_URL}/tts/azure`
const MAX_CHARS = 2000
const STORY_LIMIT = 10
const BACKGROUND_URL =
  'https://media.istockphoto.com/id/904278188/vector/starry-sky-seamless-pattern-white-and-blue-dots-in-galaxy-and-stars-style-repeatable.jpg?s=170667a&w=0&k=20&c=CaWXG_dFxCBMlNNhZp5nvhPuu1SRfTHfUdlJwn_6z_M='

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
  { name: 'Cô Chích Bông', gender: FEMALE, code: 'vi-VN-Standard-A' },
  { name: 'Cô Gấu Trắng', gender: FEMALE, code: 'vi-VN-Standard-C' },
  { name: 'Cô Vàng Anh', gender: FEMALE, code: 'vi-VN-Wavenet-A' },
  { name: 'Cô Họa Mi', gender: FEMALE, code: 'vi-VN-Wavenet-C' },
  { name: 'Chú Oai Vui Vẻ', gender: MALE, code: 'vi-VN-Standard-B' },
  { name: 'Chú Hùng Tài Ba', gender: MALE, code: 'vi-VN-Standard-D' },
  { name: 'Chú Duy Dũng Cảm', gender: MALE, code: 'vi-VN-Wavenet-B' },
  { name: 'Chú Long Lém Lỉnh ', gender: MALE, code: 'vi-VN-Wavenet-D' },
]
export const voiceList = VOICES.map((voice) => ({
  value: voice.code,
  label: voice.name,
  group: voice.gender,
}))
export const effectsProfileIdList = EFFECTS_PROFILE_ID.map((voice) => ({
  value: voice,
  label: voice,
}))

const App = (): JSX.Element => {
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
  const [selectedStory, setSelectedStory] = useState<IStory>({
    _id: 0,
    index: -1,
    title: '',
    content: '',
    source: '',
    length: '',
    updatedAt: '',
  })
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const mutation = useMutation((text: string) =>
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
        limit: STORY_LIMIT,
      }
      const queryParams = new URLSearchParams(params as any).toString()

      const response = await fetch(`${BASE_URL}/stories?${queryParams}`)
      const responseData = await response.json()
      const storyList = responseData.stories.stories as IStory[]

      const promises = storyList.map(async (story, index) => {
        const detailResponse = await fetch(`${BASE_URL}/story/${story._id}`)
        const detail = await detailResponse.json()
        const summary = shortenText(detail.story.content, 15) + '...'
        return { ...detail.story, index, summary }
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
    return <Text>An error occurred: ${(mutation.error as any).message}</Text>

  const handleTextToSpeech = async (text: string) => {
    if (!text) {
      console.log('Error: Empty text')
      return
    }
    const shortenedText = text.slice(0, MAX_CHARS)
    await mutation.mutate(shortenedText)
  }

  const getInputText = () => {
    if (!inputRef || !inputRef.current) return ''
    return (inputRef.current as any).value
  }

  // useEffect(() => {
  //   const element = document.querySelector('body')
  //   if (mutation.isLoading) {
  //     element.style.cursor = 'wait'
  //   } else {
  //     element.style.cursor = 'default'
  //   }
  // }, [mutation.isLoading])

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
          position: 'relative',
          backgroundImage: `url("${BACKGROUND_URL}")`,
        }}
      >
        <div className='overlay'></div>

        <Title
          id='title'
          order={1}
          align='center'
          mb={40}
          sx={{ fontFamily: 'Beth Ellen', color: '#e7e7e7', fontSize: 45 }}
        >
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
                sx={{
                  width: 'fit-content',
                  marginLeft: 'auto',
                  marginBottom: 20,
                }}
              >
                Convert to Speech
              </Button>

              {/* <AudioPlayer audio={audio} /> */}
              {audio && <TestPlayer2 audioData={audio} />}

              {mutation.error && (
                <Text size='sm' color='red'>
                  An error occurred: ${(mutation.error as any).message}
                </Text>
              )}
            </>
          </Stack>
        </Stack>
      </Box>
    </MantineProvider>
  )
}

export default App
