import { Box, Flex, Stack, Text } from '@mantine/core'
import React from 'react'

interface IStoryItemProps {
  story: {
    name: string
    type: string
    length: string
  }
}

const StoryItem = (props: IStoryItemProps) => {
  const {
    story: { name, type, length },
  } = props
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
    >
      <Stack spacing={1}>
        <Text sx={{ fontWeight: 'bold' }}>{name}</Text>
        <Text size='xs'>{type}</Text>
      </Stack>

      <Text size='sm'>{length}</Text>
    </Flex>
  )
}

export default StoryItem
