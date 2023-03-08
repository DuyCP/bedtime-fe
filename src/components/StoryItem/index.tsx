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
  onSelect: (story: IStory) => void
}

const StoryItem = (props: IStoryItemProps) => {
  const { story, isActive, onSelect } = props

  const { title, content, source, length, summary } = story

  const textColor = isActive ? '#ffffff' : '#212529'
  console.log('🚀 | StoryItem | isActive:', isActive)
  console.log(title)

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
            src='https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80'
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

          <Box>
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

          <Box>
            <PlayIcon
              color={isActive ? '#6741D9' : 'white'}
              secondaryColor={isActive ? 'white' : '#212529'}
            />
          </Box>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default StoryItem
