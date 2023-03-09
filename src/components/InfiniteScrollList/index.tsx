import { Box, Loader, Sx } from '@mantine/core'
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react'

interface IInfiniteScrollListProps {
  sx: Sx
  loading: boolean
  onLoadMore: () => void
}

const InfiniteScrollList: FC<PropsWithChildren<IInfiniteScrollListProps>> = (
  props
) => {
  const { onLoadMore, sx, loading, children } = props
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight
      if (isAtBottom) {
        onLoadMore()
      }
    }
  }, [onLoadMore])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  return (
    <Box ref={containerRef} className='scroll-list' sx={sx}>
      {children}

      {loading && (
        <Box mx='auto' mb={10} sx={{ height: 30, width: 'fit-content' }}>
          <Loader size='lg' variant='dots' color='#dddddd80' />
        </Box>
      )}
    </Box>
  )
}

export default InfiniteScrollList
