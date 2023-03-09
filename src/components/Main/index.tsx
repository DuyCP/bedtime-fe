import { useEffect, useImperativeHandle, useRef, useState } from 'react'

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
import AddIcon from '../../icons/AddIcon'
import CreateStory from '../CreateStory'

interface Item {
  id: string
  name: string
}

export interface IAudioConfig {
  content: string
  speed: number
  pitch: number
  volumeGain: number
  sampleRate: number
  voice: string
  effectsProfileId: string[]
}

const Main = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('story')
  const [audioConfig, setAudioConfig] = useState<IAudioConfig>({
    content: '',
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
  const playerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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

  const mutation = useMutation((config: IAudioConfig) =>
    fetch(GOOGLE_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        input: { text: config.content },
        voice: {
          name: config.voice,
        },
        audioConfig: {
          pitch: config.pitch,
          volumeGainDb: config.volumeGain,
          effectsProfileId: config.effectsProfileId,
          speakingRate: config.speed,
          // sampleRateHertz: config.sampleRate,
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
        const detailResponse = await fetch(`${BASE_URL}/stories/${story._id}`)
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
    await mutation.mutate({ ...audioConfig, content: shortenedText })
  }


  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  const onSelectStory = (story: IStory) => {
    setSelectedStory(story)
    handleTextToSpeech(story.content)
  }

  const playStory = () => {
    if (playerRef && playerRef.current) {
      playerRef.current.audio.current.play()
    }
  }

  useImperativeHandle(playerRef, () => ({
    getAudioElement: () => {
      return playerRef.current.audio.current
    },
  }))

  const isStoryTab = activeTab === 'story'
  const isCustomTab = activeTab === 'custom'

  return (
    <Flex
    >
      <Container
        id='main'
        size={380}
        p={20}
        sx={{
          background: '#F4F5FC',
          borderRadius: 4,
          height: 'fit-content',
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
                setIsPlaying={setIsPlaying}
                ref={playerRef}
              />

              {mutation.error && (
                <Text size='sm' color='red'>
                  An error occurred: ${(mutation.error as any).message}
                </Text>
              )}
            </>
          </Stack>

          <Flex sx={{ width: '100%', marginInline: 'auto' }}>
            <Tabs
              variant='pills'
              defaultValue='story'
              sx={{ width: '100%' }}
              onTabChange={(value) => setActiveTab(value as string)}
            >
              <Tabs.List>
                <Tabs.Tab
                  value='story'
                  icon={<NoteIcon color={isStoryTab ? '#6741D9' : ''} />}
                  sx={{ fontSize: 12 }}
                >
                  Có sẵn
                </Tabs.Tab>
                <Tabs.Tab
                  value='custom'
                  icon={<AddIcon color={isCustomTab ? '#6741D9' : ''} />}
                  sx={{ fontSize: 12 }}
                >
                  Tạo mới
                </Tabs.Tab>
              </Tabs.List>

              {/* Story List */}
              <Tabs.Panel value='story' pt='xs'>
                <Box>
                  <InfiniteScrollList
                    onLoadMore={loadMore}
                    loading={getStoriesLoading}
                    sx={{
                      height: 516,
                      overflowY: 'scroll',
                    }}
                  >
                    {storyList.map((story, index) => {
                      const isActive =
                        selectedStory.index === index ||
                        selectedStory._id === story._id
                      return (
                        <Box key={index} sx={{ marginBottom: 10 }}>
                          <StoryItem
                            isActive={isActive}
                            story={story}
                            playStory={playStory}
                            onSelect={onSelectStory}
                            isPlaying={isPlaying && isActive}
                          />
                        </Box>
                      )
                    })}
                  </InfiniteScrollList>
                </Box>
              </Tabs.Panel>

              {/* Create Story */}
              <Tabs.Panel value='custom' pt='xs' sx={{ height: 410 }}>
                <CreateStory
                  isLoading={mutation.isLoading}
                  audioConfig={audioConfig}
                  setAudioConfig={setAudioConfig}
                  generateAudio={mutation.mutate}
                />
              </Tabs.Panel>
            </Tabs>
          </Flex>
        </Stack>
      </Container>
    </Flex>
  )
}

export default Main
