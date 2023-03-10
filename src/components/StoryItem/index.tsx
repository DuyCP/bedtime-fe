import React, { Dispatch, SetStateAction } from 'react'

import { Box, Flex, Image, Stack, Text } from '@mantine/core'
import PauseIcon from '../../icons/PauseIcon'
import ClockIcon from '../../icons/ClockIcon'
import HeartIcon from '../../icons/HeartIcon'
import PlayIcon from '../../icons/PlayIcon'
import { formatDuration, getS3Url } from '../../utils'
import { DEFAULT_BANNER } from '../../constants'

export interface IStory {
  _id?: string
  index?: number
  categories: string[]
  banner: string
  title: string
  content: string
  summary?: string
  tags: string[]
  listened: number
  status: string
  duration: number
  approvedAt: string
  updatedAt: string
}

interface IStoryItemProps {
  story: IStory
  isActive: boolean
  isPlaying?: boolean
  isLike?: boolean
  playStory: () => void
  onSelect: (story: IStory) => void
}

const StoryItem = (props: IStoryItemProps) => {
  const {
    story,
    isActive,
    isPlaying,
    isLike = false,
    playStory,
    onSelect,
  } = props

  const { title, content, duration, banner, categories } = story

  const textColor = isActive ? '#ffffff' : '#212529'
  const categoriesText = categories.join(', ')

  return (
    <Flex
      justify='space-between'
      sx={{
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
            alt='story banner'
            width={50}
            height={50}
            src={banner || DEFAULT_BANNER}
          />

          <Stack spacing={0}>
            <Box my='auto'>
              <Text
                sx={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: textColor,
                  lineHeight: 1.1,
                }}
              >
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
                {categoriesText}
              </Text>
            </Box>
          </Stack>

          <Box sx={{ marginLeft: 'auto' }}>
            <HeartIcon color={isActive ? 'white' : '#6741D9'} />
          </Box>
        </Flex>

        <Flex justify='space-between' align='center'>
          <Flex gap={6.5}>
            <ClockIcon color={isActive ? 'white' : '#212529'} />
            <Text sx={{ color: textColor, fontSize: 12 }}>
              {formatDuration(duration)}
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
