import { TextToSpeechClient } from '@google-cloud/text-to-speech'
import { useEffect, useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import AudioPlayer from '../AudioPlayer'
import AudioPlayer2 from '../AudioPlayer/AudioPlayer2'

// api_key: 'AIzaSyDivZXxjKp4OCzgWW4gOS36f65z0NjLi-4',
// const client = new TextToSpeechClient({
//   credentials: {
//     client_email: 'duycp-670@prismatic-vial-379201.iam.gserviceaccount.com',
//     private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIKmzVYBlFbfL8\nPxiJmUATKej7Y7e3b5JHxXc0dw/rePaxHB5CWw+rbqDXnT1w3DwlCKcqPIWGo6b5\na08FQUsCKrcWzoxzAVXxFVAqbwcEPxZEfOajQb3NP3RmRMdduRHji46jsCpYAIgV\nE7QLj0E87yd+7FK943tAb00wwdatsjwsdq78h+CWbwnrodWo6Q/ZlwD7MfTCdXLZ\nXKpixjCkaonK7BZWl1A3B3AaduWynkdOJTkgAmbhA6jJvjlcyP2PufhA8SeK7eaG\n3cBXaMProeXzESQccc3CN42YwQ/3jTHNZarX+jBpE4iagSj1OYvaTqxgjvVIQbqH\n8p3MNVChAgMBAAECggEAYhyBafkHigOBdWiL424NfRcuzoGrHCuA3NMKQdoWIIoT\nCO7KWiX+QT4hcm3tHrOke1aJcWdm3365qkmR2vaNCIvdYD1vlDNUZ63VtGblXox5\noqpB9kWT/dWbfUE7I1JCVXEjQlJn/uiLyyD0QDJAfNiQWGMHj3HACO5FPJ/WVR5H\nfg0ZzZrlC3N3ybJn57Lss6KlSoY+8MFRkh5m9Undsr7t2SnoLOpSgS3GNplPVpYW\nv5RcxVAqt6/uiLf99UNVvo8AU3n8vJ947m2KkQhJIsXoMbfXykFWk3cVI8+Gs3r+\nCMYHWro+MWaz+s3IrVkhbzRZ0mLPm9te4h5vnzUorQKBgQD+N0hNpchXRK+Vs78D\nEz843Hj7PfL3IAPFbJckPDTuyDpE8M9yb2PWcLwTwbKxTPhGIZOfNwgk6TEmqn04\noODhiaGiL31IX8y7B1ACiHvq0Pw71m/aBmnlGDOReQfWSPJtvaexWuiKdgm98EMB\nDK+lWNOntyaskfYQEBwP8ZUFjwKBgQDJkgmaTmYRLaiSb9RWY6AIxuIJnnTDrF8v\nl9KDc5W0S5x68oQalZlH8CnIXE8B9bMIJmI2akPe2KILeA1paN0QWXsHnzOGfxXP\nJF1JqH13gsAptFOftUoq4hc76V386FhWSxTdElzAj9oyEEKz23yDe9T79A0ng6yf\nj+cuJxgOzwKBgQCPlXnpIXH+mHT0AQoqGnzjCOPsRBkvK431vFfBx5++HqmKttj0\nsaWaQSJ5pjXfnrG8KsrOaq7W6j8wr6r6iSN7P9ljWZ9ReYqROJggViZngpJ02bFj\nW6wEEZ9O0yVyCtGi2jQVIFunmPP3q/SsaxXqNjmVyQS3A9oPSIoRF0osUQKBgQCD\nntKaadsIGJJcnJ1Ak+kqEgQDV+7S3rmA8FhL8autgTn6pmVQnqLqcI44AN6uXuu6\nxKWY9qa+2yJk7s2DKTBAvs0xWulgR5fMHOi1ckoLQduM3+1C+jQl8GBPhMEUpfsY\nzgofmR/rtYM68Zc8rnONv8yBgQkd5kNQJb1FS83PzQKBgCJRWaE4XE6h8KMFeeq+\nA6LsmPyG3QqJdfGrE/lcfRXHYOb25CRr888q8ZXRA6h50fAbRsT9t7OJ8BgU2r5K\nRnQN6GcJ/hazCbX3U4c1NXp+op0q2sabKavc2BzsPfkFuAdxDqezioC0cfmI8fHG\nYrP6n7mFP2wuoBHnuAsizn6S\n-----END PRIVATE KEY-----\n`,
//   },
// })

const BASE_URL = 'http://localhost:3000/api'
const GOOGLE_ENDPOINT = `${BASE_URL}/tts/google`
const AZURE_ENDPOINT = `${BASE_URL}/tts/azure`

const PROVIDER = {
  GOOGLE: 'GOOGLE',
  AZURE: 'AZURE',
}

const getEndpoint = (provider: string) => {
  switch (provider) {
    case PROVIDER.GOOGLE:
    default: {
      return GOOGLE_ENDPOINT
    }
    case PROVIDER.AZURE: {
      return AZURE_ENDPOINT
    }
  }
}

const TextInput = (): JSX.Element => {
  const [input, setInput] = useState('')
  const [provider, setProvider] = useState(PROVIDER.GOOGLE)
  const [audio, setAudio] = useState<null | string>('')

  const mutation = useMutation((text) =>
    fetch(getEndpoint(provider), {
      method: 'POST',
      body: JSON.stringify({ input: { text } }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.blob())
      .then((url) => {
        const reader = new FileReader()
        reader.readAsDataURL(url)
        reader.onloadend = () => {
          console.log(reader.result)
          // setAudio(reader.result as string)
          console.log(reader.result)

          // const base64 = reader.result.split(',')[1] as string
          // const audioData = `data:audio/mpeg;base64,` + base64
          const audioData = reader.result as string
          console.log('🚀 | .then | audioData:', audioData)
          setAudio(audioData)
          // setAudio('Xin chào')
        }
      })
      .catch((error) => console.error(error))
  )

  // Convert to async/await
  // const mutation = useMutation(async (text) => {
  //   try {
  //     const response = await fetch(getEndpoint(provider), {
  //       method: 'POST',
  //       body: JSON.stringify({ input: { text } }),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //     })

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }

  //     const blob = await response.blob()

  //     const reader = new FileReader()

  //     const base64Data = await new Promise((resolve, reject) => {
  //       const reader = new FileReader()
  //       reader.readAsDataURL(blob)
  //       // reader.onloadend = () => resolve(reader.result.split(',')[1])
  //       reader.onloadend = () => resolve(reader.result)
  //       reader.onerror = reject
  //     })

  //     console.log(base64Data)
  //     setAudio(base64Data as string)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // })

  if (mutation.error) return `An error occurred: ${mutation.error.message}`

  const handleTextToSpeech = async (text: string) => {
    // if (!text) {
    //   console.log('Error: Empty text')
    //   return
    // }
    await mutation.mutate(text)
  }

  const isGoogleActive = provider === PROVIDER.GOOGLE
  const isAzureActive = provider === PROVIDER.AZURE

  return (
    <div className='text-input-container bg-gray-200'>
      <h1>Bedtime Stories</h1>
      <div>
        <button
          onClick={() => setProvider(PROVIDER.GOOGLE)}
          style={{ opacity: isGoogleActive ? 1 : 0.3 }}
          className='bg-slate-500 text-3xl'
        >
          Google Cloud
        </button>

        <button
          onClick={() => setProvider(PROVIDER.AZURE)}
          style={{ opacity: isAzureActive ? 1 : 0.3 }}
        >
          Microsoft Azure
        </button>
      </div>

      <div>
        <textarea onInput={(e) => setInput((e.target as any).value)}></textarea>
      </div>

      <button
        disabled={mutation.isLoading}
        onClick={() => handleTextToSpeech(input)}
        className='tts-button'
      >
        Convert to Speech
      </button>

      <AudioPlayer audio={audio} />
      {/* <AudioPlayer2 base64Data={audio} /> */}
      {/* {audio !== '' && !mutation.isLoading && <AudioPlayer audio={audio} />} */}

      {mutation.error && (
        <span>An error occurred: ${mutation.error.message}</span>
      )}
    </div>
  )
}

export default TextInput
