import React, { Dispatch, SetStateAction } from 'react'

import { Flex, Stack, Text } from '@mantine/core'

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
  onSelect: Dispatch<SetStateAction<IStory>>
}
const StoryItem = (props: IStoryItemProps) => {
  const { story, isActive, onSelect } = props

  const { title, content, source, length, summary } = story

  return (
    <Flex
      justify='space-between'
      sx={{
        backgroundColor: isActive ? '#155a9c' : '#25262b',
        borderRadius: 6,
        padding: '10px 20px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: isActive ? '#135088' : '#1e1e21',
        },
      }}
      onClick={() => onSelect(story)}
    >
      <Stack spacing={1}>
        <Text sx={{ fontWeight: 'bold' }}>{title}</Text>
        <Text
          size='xs'
          sx={
            {
              // maxWidth: '350px',
              // overflow: 'hidden',
              // whiteSpace: 'nowrap',
              // textOverflow: 'ellipsis',
            }
          }
        >
          {summary}
        </Text>
      </Stack>

      <Text size='sm'>{length || '04:20'}</Text>
    </Flex>
  )
}

export default StoryItem
