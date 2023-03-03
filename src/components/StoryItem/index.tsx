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
  onSelect: Dispatch<React.SetStateAction<string>>
}

const StoryItem = (props: IStoryItemProps) => {
  const { story, onSelect } = props

  const { title, content, source, length } = story

  return (
    <Flex
      justify='space-between'
      sx={{
        backgroundColor: '#25262b',
        borderRadius: 6,
        padding: '10px 20px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#1e1e21',
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
