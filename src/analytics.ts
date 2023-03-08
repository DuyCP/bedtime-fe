import ReactGA from 'react-ga'
import { TRAKCING_ID } from './constants'

export const initGA = () => {
  ReactGA.initialize(TRAKCING_ID)
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
