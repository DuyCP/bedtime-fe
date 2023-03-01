import { useEffect, useState } from 'react'

import { Howl, Howler } from 'howler'
import WaveSurfer from 'wavesurfer.js'

const AudioPlayer = (props) => {
  const { audio } = props

  const [sound, setSound] = useState<any>(null)

  useEffect(() => {
    // Initialize Howler.js
    Howler.autoUnlock = false
    // Create a new Howl object from the Audio object
    // const bytes = atob( props.audio.split(',')[1]);
    // const buffer = new Uint8Array(bytes.length);
    // for (let i = 0; i < bytes.length; i++) {
    //   buffer[i] = bytes.charCodeAt(i);
    // }
    // const blob = new Blob([buffer], { type: 'audio/wav' });
    // const url = URL.createObjectURL(blob);

    // create a new Howl object with the audio data
    // this.sound = new Howl({
    //   src: [url],
    //   format: ['wav'],
    //   onload: () => {
    //     this.setState({ loaded: true });
    //   }
    // });

    setSound(new Howl({ src: props.audio }))
  }, [audio])

  const handlePlay = () => {
    console.log('🚀 | handlePlay | sound:', sound)
    if (sound && !sound.playing()) {
      sound.play()
    }
  }

  const handlePause = () => {
    if (sound && sound.playing()) {
      sound.pause()
    }
  }

  const handleStop = () => {
    if (sound) {
      sound.stop()
    }
  }

  const noAudio = audio === null || audio === ''

  return (
    <div>
      <button disabled={noAudio} onClick={handlePlay}>
        Play
      </button>
      <button disabled={noAudio} onClick={handlePause}>
        Pause
      </button>
      <button disabled={noAudio} onClick={handleStop}>
        Stop
      </button>
    </div>
  )
}

export default AudioPlayer
