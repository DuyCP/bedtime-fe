import { GENDER } from '../enums'

const { MALE, FEMALE } = GENDER

const VOICES = [
  { name: 'Cô Chích Bông', gender: FEMALE, code: 'vi-VN-Standard-A' },
  { name: 'Cô Gấu Trắng', gender: FEMALE, code: 'vi-VN-Standard-C' },
  { name: 'Cô Vàng Anh', gender: FEMALE, code: 'vi-VN-Wavenet-A' },
  { name: 'Cô Họa Mi', gender: FEMALE, code: 'vi-VN-Wavenet-C' },
  { name: 'Chú Oai Vui Vẻ', gender: MALE, code: 'vi-VN-Standard-B' },
  { name: 'Chú Hùng Tài Ba', gender: MALE, code: 'vi-VN-Standard-D' },
  { name: 'Chú Duy Dũng Cảm', gender: MALE, code: 'vi-VN-Wavenet-B' },
  { name: 'Chú Long Lém Lỉnh ', gender: MALE, code: 'vi-VN-Wavenet-D' },
]

export const VOICE_LIST = VOICES.map((voice) => ({
  value: voice.code,
  label: voice.name,
  group: voice.gender,
}))

const EFFECTS_PROFILE_ID = [
  'wearable-class-device',
  'handset-class-device',
  'headphone-class-device',
  'small-bluetooth-speaker-class-device',
  'medium-bluetooth-speaker-class-device',
  'large-home-entertainment-class-device',
  'large-automotive-class-device',
  'telephony-class-application',
]
export const effectsProfileIdList = EFFECTS_PROFILE_ID.map((voice) => ({
  value: voice,
  label: voice,
}))

export const TRAKCING_ID = 'UA-259786368-1'
export const BASE_URL = import.meta.env.VITE_BASE_URL
export const GOOGLE_ENDPOINT = `${BASE_URL}/tts/google`
export const AZURE_ENDPOINT = `${BASE_URL}/tts/azure`
export const MAX_CHARS = 2000
// const STORY_LIMIT = 50
export const STORY_LIMIT = 10
export const BACKGROUND_URL = ''
//   'https://media.istockphoto.com/id/904278188/vector/starry-sky-seamless-pattern-white-and-blue-dots-in-galaxy-and-stars-style-repeatable.jpg?s=170667a&w=0&k=20&c=CaWXG_dFxCBMlNNhZp5nvhPuu1SRfTHfUdlJwn_6z_M='
