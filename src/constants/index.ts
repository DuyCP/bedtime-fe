import { GENDER } from "../enums";
import { Heart, Home, SearchNormal1 } from "iconsax-react";

const { MALE, FEMALE } = GENDER;

export const MENU_LIST = [
  { label: "Trang chủ", link: "/home", Icon: Home },
  { label: "Tìm kiếm", link: "/search", Icon: SearchNormal1 },
  { label: "Đã thích", link: "/favourite", Icon: Heart },
];

const VOICES = [
  { name: "Cô Chích Bông", gender: FEMALE, code: "vi-VN-Standard-A" },
  { name: "Cô Gấu Trắng", gender: FEMALE, code: "vi-VN-Standard-C" },
  { name: "Cô Vàng Anh", gender: FEMALE, code: "vi-VN-Wavenet-A" },
  { name: "Cô Họa Mi", gender: FEMALE, code: "vi-VN-Wavenet-C" },
  { name: "Chú Oai Vui Vẻ", gender: MALE, code: "vi-VN-Standard-B" },
  { name: "Chú Hùng Tài Ba", gender: MALE, code: "vi-VN-Standard-D" },
  { name: "Chú Duy Dũng Cảm", gender: MALE, code: "vi-VN-Wavenet-B" },
  { name: "Chú Long Lém Lỉnh ", gender: MALE, code: "vi-VN-Wavenet-D" },
];

export const VOICE_LIST = VOICES.map((voice) => ({
  value: voice.code,
  label: voice.name,
  group: voice.gender,
}));

const EFFECTS_PROFILE_ID = [
  "wearable-class-device",
  "handset-class-device",
  "headphone-class-device",
  "small-bluetooth-speaker-class-device",
  "medium-bluetooth-speaker-class-device",
  "large-home-entertainment-class-device",
  "large-automotive-class-device",
  "telephony-class-application",
];
export const effectsProfileIdList = EFFECTS_PROFILE_ID.map((voice) => ({
  value: voice,
  label: voice,
}));

export const TRAKCING_ID = "UA-259786368-1";
export const S3_URL = import.meta.env.VITE_S3_URL;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const GOOGLE_ENDPOINT = `${BASE_URL}/api/tts/google`;
export const AZURE_ENDPOINT = `${BASE_URL}/tts/azure`;
export const MAX_CHARS = 2000;
export const STORY_LIMIT = 10;
export const MAX_STORY_CHARS = 1000;
export const DEFAULT_BANNER =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY-MBiZ8Q5msCkgClMNC_VaJZVhNOCmwMC68XXMhbJ3xb5Ei0OHftU2cybZce1lX3XZLE&usqp=CAU";
