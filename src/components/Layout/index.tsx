import { Box, Flex, Stack, Text } from '@mantine/core'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import HeartIcon from '../../icons/HeartIcon'
import HomeIcon from '../../icons/HomeIcon'
import SearchIcon from '../../icons/SearchIcon'

const MENU_LIST = [
  { label: 'Trang chủ', value: 'home', link: '/', Icon: HomeIcon },
  { label: 'Tìm kiếm', value: 'search',link: '/search', Icon: SearchIcon },
  { label: 'Đã thích', value: 'like',link: '/like', Icon: HeartIcon },
]

const Layout = () => {
const [menu, setMenu] = useState(MENU_LIST[0].value)

return (
  <Box id='layout' sx={{ minWidth: 360 }}>
      <Outlet />

      <Flex sx={{}} mx='auto' justify='space-around' mt='auto'>
        {MENU_LIST.map(({ link, value, label, Icon }) => {
          const isActive = value === menu
          const menuColor = isActive ? '#6741D9' : '#868E96'
          return (
            <Link to={link} style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setMenu(value)}>
            <Stack spacing={4.5} align='center'>
              <Icon color={menuColor} />

              <Text
                sx={{
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: 13,
                  color: menuColor,
                }}
              >
                {label}
              </Text>
            </Stack>
          </Link>
          )
        })}
      </Flex>
    </Box>
  )
}

export default Layout
