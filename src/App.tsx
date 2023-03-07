import { useEffect, useRef, useState } from 'react'

import {
  Box,
  Button,
  Container,
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
import AudioPlayer from './components/AudioPlayer'
import StoryItem, { IStory } from './components/StoryItem'
import TextInput from './components/TextInput'
import { shortenText } from './utils'

import './App.css'
import {
  BACKGROUND_URL,
  BASE_URL,
  GOOGLE_ENDPOINT,
  MAX_CHARS,
  STORY_LIMIT,
  VOICE_LIST,
} from './constants'
import InfiniteScrollList from './components/InfiniteScrollList'

interface Item {
  id: string
  name: string
}

export interface IAudioConfig {
  speed: number
  pitch: number
  volumeGain: number
  sampleRate: number
  voice: string
  effectsProfileId: string[]
}

const App = (): JSX.Element => {
  const [audioConfig, setAudioConfig] = useState<IAudioConfig>({
    speed: 1,
    pitch: 0,
    volumeGain: 0,
    sampleRate: 20,
    voice: VOICE_LIST[0].value,
    effectsProfileId: [],
  })

  const [audio, setAudio] = useState<null | string>('')
  const [page, setPage] = useState(1)
  const [selectedStory, setSelectedStory] = useState<IStory>({
    _id: 0,
    index: -1,
    title: '',
    content: '',
    source: '',
    length: '',
    updatedAt: '',
  })
  const [storyList, setStoryList] = useState<IStory[]>([])
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const mutation = useMutation((text: string) =>
    fetch(GOOGLE_ENDPOINT, {
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
        page,
        limit: STORY_LIMIT,
      }
      const queryParams = new URLSearchParams(params as any).toString()

      const response = await fetch(`${BASE_URL}/stories?${queryParams}`)
      const responseData = await response.json()
      const storyListData = responseData.stories.stories as IStory[]

      const promises = storyListData.map(async (story, index) => {
        const detailResponse = await fetch(`${BASE_URL}/story/${story._id}`)
        const detail = await detailResponse.json()
        const summary = shortenText(detail.story.content, 15) + '...'
        return { ...detail.story, index, summary }
      })

      const storiesWithDetail = await Promise.all(promises)
      setStoryList((prev) => [...prev, ...storiesWithDetail])
      return storiesWithDetail
    },
    { enabled: false }
  )

  useEffect(() => {
    refetch()
  }, [page])

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

  const loadMore = () => {
    setPage((prev) => prev + 1)
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
        sx={{
          position: 'relative',
          backgroundImage: `url("${BACKGROUND_URL}")`,
        }}
      >
        <div className='overlay'></div>

        <Container
          size={600}
          px={40}
          py={40}
          sx={{ background: '#131313df', borderRadius: 4 }}
        >
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
                  <Box>
                    <InfiniteScrollList
                      onLoadMore={loadMore}
                      loading={getStoriesLoading}
                      sx={{
                        height: 400,
                        overflowY: 'scroll',
                      }}
                    >
                      {storyList.map((story, index) => (
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
                      ))}
                    </InfiniteScrollList>
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

                <AudioPlayer
                  loading={mutation.isLoading}
                  audio={audio || undefined}
                />

                {mutation.error && (
                  <Text size='sm' color='red'>
                    An error occurred: ${(mutation.error as any).message}
                  </Text>
                )}
              </>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </MantineProvider>
  )
}

export default App

