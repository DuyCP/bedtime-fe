import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom'
import Main from './components/Main'
import Layout from './components/Layout'
import { MantineProvider } from '@mantine/core'

import './App.css'
import './override.css'

const App = (): JSX.Element => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Nunito, sans serif',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        components: {
          Text: {
            styles: {
              root: {
                color: '#212529',
              },
            },
          },
        },
      }}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/main' />} />
          <Route path='main' element={<Main />} />
          <Route path='*' element={<span>404</span>} />
        </Route>
      </Routes>
    </MantineProvider>
  )
}

export default App
