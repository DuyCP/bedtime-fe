import { Box } from '@mantine/core'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Box sx={{ minWidth: 360 }}>
      {/* A "layout route" is a good place to put markup you want to
        share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
      <Outlet />
    </Box>
  )
}

export default Layout
