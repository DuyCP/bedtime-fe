import { Box, Flex, Stack, Text } from '@mantine/core'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import HomeIcon from '../../icons/HomeIcon'

const MENU_LIST = [{ label: 'Trang chủ', link: '/', icon: HomeIcon }]

const Layout = () => {
  const isActive = true

  const menuColor = isActive ? '#6741D9' : '#868E96'

  return (
    <Box id='layout' sx={{ minWidth: 360 }}>
      <Outlet />

      <Flex sx={{ height: '93%' }}>
        <Link to='/main' style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <Stack spacing={4.5} align='center'>
            <HomeIcon color={menuColor} />

            <Text
              sx={{
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 600,
                fontSize: 13,
                color: menuColor,
              }}
            >
              Trang chủ
            </Text>
          </Stack>
        </Link>
      </Flex>
    </Box>
  )
}

export default Layout
