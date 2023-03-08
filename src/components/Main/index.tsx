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
import AudioPlayer from '../../components/AudioPlayer'
import StoryItem, { IStory } from '../../components/StoryItem'
import TextInput from '../../components/TextInput'
import { shortenText } from '../../utils'
import ReactGA from 'react-ga'

import '../../App.css'
import InfiniteScrollList from '../../components/InfiniteScrollList'
import {
  BASE_URL,
  GOOGLE_ENDPOINT,
  MAX_CHARS,
  STORY_LIMIT,
  VOICE_LIST,
} from '../../constants'
import { initGA, logPageView } from '../../analytics'
import MicIcon from '../../icons/MicIcon'
import NoteIcon from '../../icons/NoteIcon'

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

const Main = (): JSX.Element => {
  useEffect(() => {
    initGA()
    logPageView()
    ReactGA.event({
      action: 'test action',
      label: 'test label',
      category: 'test category',
      value: 100,
    })
  }, [])

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

      // INFO: On page first load, automatically select the first story
      if (storyList.length === 0) {
        const firstStory = storiesWithDetail[0]
        const shortenedContent = firstStory.content.slice(0, MAX_CHARS)
        mutation.mutate(shortenedContent)
        setSelectedStory(firstStory)
      }

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

  const onSelectStory = (story: IStory) => {
    setSelectedStory(story)
    handleTextToSpeech(story.content)
  }

  return (
    <Flex
      className='App'
      sx={{
        position: 'relative',
        // backgroundImage: `url("${BACKGROUND_URL}")`,
      }}
    >
      <Container
        id='main'
        size={380}
        p={20}
        sx={{
          background: '#F4F5FC',
          borderRadius: 4,
          height: 'fit-content',
          width: 600,
        }}
      >
        {/* <Title
          id='title'
          order={1}
          align='center'
          mb={40}
          sx={{ fontFamily: 'Beth Ellen', color: '#e7e7e7', fontSize: 35 }}
        >
          Bedtime Stories
        </Title> */}

        <Stack sx={{ maxWidth: 600, marginInline: 'auto', gap: 0 }}>
          <Stack>
            <>
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

          <Flex sx={{ width: '100%', marginInline: 'auto' }}>
            <Tabs variant='pills' defaultValue='story' sx={{ width: '100%' }}>
              <Tabs.List>
                <Tabs.Tab
                  value='story'
                  icon={<MicIcon />}
                  sx={{ fontSize: 12, width: '50%' }}
                >
                  Story List
                </Tabs.Tab>
                <Tabs.Tab
                  value='custom'
                  icon={<NoteIcon />}
                  sx={{ fontSize: 12, width: '50%' }}
                >
                  Custom Voice
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
                          onSelect={onSelectStory}
                        />
                      </Box>
                    ))}
                  </InfiniteScrollList>
                </Box>
              </Tabs.Panel>

              {/* Custom Input */}
              <Tabs.Panel value='custom' pt='xs' sx={{ height: 410 }}>
                <TextInput minRows={12} ref={inputRef} />

                <Button
                  disabled={mutation.isLoading}
                  onClick={() => handleTextToSpeech(getInputText())}
                  sx={{
                    width: 'fit-content',
                    marginLeft: 'auto',
                    marginTop: 20,
                  }}
                >
                  Convert to Speech
                </Button>
              </Tabs.Panel>
            </Tabs>
          </Flex>

          {/* <AudioConfig
              audioConfig={audioConfig}
              setAudioConfig={setAudioConfig}
            /> */}
        </Stack>
      </Container>
    </Flex>
  )
}

export default Main
