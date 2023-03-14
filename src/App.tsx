import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './components/Main'
import Layout from './components/Layout'
import { Box, MantineProvider } from '@mantine/core'

import { HomePage } from './pages/HomePage'
import { OnboardingPage } from './pages/OnboardingPage'
import MyStories from './components/MyStories'
import './App.css'
import './override.css'
import { SearchPage } from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

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
      <Box className='App'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to='/login' />} />
            <Route path='main' element={<Main />} />
            <Route path='home' element={<HomePage />} />
            <Route path='search' element={<SearchPage />} />
            <Route path='my-stories' element={<MyStories />} />
            <Route path='*' element={<Box sx={{ height: '93%' }}></Box>} />
          </Route>
          <Route path='onboarding' element={<OnboardingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
        </Routes>
      </Box>
    </MantineProvider>
  )
}

export default App
