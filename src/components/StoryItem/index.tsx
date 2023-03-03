import React, { Dispatch } from 'react'

import { Box, Flex, Stack, Text } from '@mantine/core'

interface IStoryItemProps {
  story: {
    title: string
    content: string
    source: string
    length: string
    updatedAt: string
  }
  isActive: boolean
  onSelect: Dispatch<
    React.SetStateAction<{
      _id: number
      title: string
      content: string
    }>
  >
}
//#1971c2
const StoryItem = (props: IStoryItemProps) => {
  const { story, isActive, onSelect } = props

  const { title, content, source, length } = story

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
        <Text size='xs'>{source}</Text>
      </Stack>

      <Text size='sm'>{length || '04:20'}</Text>
    </Flex>
  )
}

export default StoryItem
