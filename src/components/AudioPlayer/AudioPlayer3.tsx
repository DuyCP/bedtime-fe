import React, { useState, useEffect, useRef } from 'react'

function AudioPlayer3() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current

    const handleLoadedData = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleSpeedChange = () => {
    const newSpeed = playbackRate === 1 ? 1.5 : 1

    audioRef.current.playbackRate = newSpeed
    setPlaybackRate(newSpeed)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <audio ref={audioRef} src='example.mp3' />

      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleSpeedChange}>Speed: {playbackRate}x</button>
        <span>{formatTime(currentTime)}</span> /{' '}
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

export default AudioPlayer3
