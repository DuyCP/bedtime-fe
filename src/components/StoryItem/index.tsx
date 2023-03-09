import React, { Dispatch, SetStateAction } from 'react'

import { Box, Flex, Image, Stack, Text } from '@mantine/core'
import PauseIcon from '../../icons/PauseIcon'
import ClockIcon from '../../icons/ClockIcon'
import HeartIcon from '../../icons/HeartIcon'
import PlayIcon from '../../icons/PlayIcon'

export interface IStory {
  _id?: number
  index?: number
  title: string
  content: string
  source: string
  length: string
  summary?: string
  updatedAt: string
}

interface IStoryItemProps {
  story: IStory
  isActive: boolean
  isPlaying?: boolean
  playStory: () => void
  onSelect: (story: IStory) => void
}

const StoryItem = (props: IStoryItemProps) => {
  const { story, isActive, isPlaying, playStory, onSelect } = props

  const { title, content, source, length, summary } = story

  const textColor = isActive ? '#ffffff' : '#212529'

  return (
    <Flex
      justify='space-between'
      sx={{
        // width: 350,
        height: 98,
        boxShadow:
          '0px 7px 7px -5px rgba(0, 0, 0, 0.04), 0px 10px 15px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)',
        backgroundColor: isActive ? '#7048E8' : 'white',
        borderRadius: 10,
        padding: 10,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: isActive ? '#7048E8' : '#d5cfea',
        },
      }}
      onClick={() => onSelect(story)}
    >
      <Stack spacing={1} sx={{ width: '100%' }}>
        <Flex gap={10}>
          <Image
            radius='md'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY-MBiZ8Q5msCkgClMNC_VaJZVhNOCmwMC68XXMhbJ3xb5Ei0OHftU2cybZce1lX3XZLE&usqp=CAU'
            alt='Random unsplash image'
            width={50}
            height={50}
          />

          <Box>
            <Text sx={{ fontWeight: 700, fontSize: 17, color: textColor }}>
              {title}
            </Text>
            <Text
              size='xs'
              sx={{
                color: isActive ? '#E9ECEF' : '#495057',
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              {/* {summary} */}
              Cổ tích Việt Nam
            </Text>
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <HeartIcon color={isActive ? 'white' : '#6741D9'} />
          </Box>
        </Flex>

        <Flex justify='space-between' align='center'>
          <Flex gap={6.5}>
            <ClockIcon color={isActive ? 'white' : '#212529'} />
            <Text sx={{ color: textColor, fontSize: 12 }}>
              {length || '03 phút 15 giây'}
            </Text>
          </Flex>

          <Box
            onClick={(e) => {
              console.log('🚀 | StoryItem | e:', e)
              e.stopPropagation()
              playStory()
            }}
          >
            {isPlaying ? (
              <PauseIcon
                color={isActive ? '#6741D9' : 'white'}
                secondaryColor={isActive ? 'white' : '#212529'}
              />
            ) : (
              <PlayIcon
                color={isActive ? '#6741D9' : 'white'}
                secondaryColor={isActive ? 'white' : '#212529'}
              />
            )}
          </Box>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default StoryItem
