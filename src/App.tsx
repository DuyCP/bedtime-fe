import './App.css'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import Main from './components/Main'
import Layout from './components/Layout'

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='*' element={<span>404</span>} />
      </Route>
    </Routes>
  )
}

export default App
