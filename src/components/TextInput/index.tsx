import { forwardRef, Ref } from 'react'

import { Box, Textarea } from '@mantine/core'

interface ITextInputProps {
  minRows?: number
}

const TextInput = forwardRef(
  (
    props: ITextInputProps,
    ref: Ref<HTMLTextAreaElement> | undefined
  ): JSX.Element => {
    const { minRows = 2 } = props

    return (
      <Box>
        <Textarea
          placeholder='Input in Vietnamese...'
          label='Your story'
          ref={ref}
          autosize
          minRows={minRows}
        />
      </Box>
    )
  }
)

export default TextInput
