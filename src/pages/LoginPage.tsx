import React from 'react'

import {
  Box,
  Button,
  Divider,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconDatabase } from '@tabler/icons-react'
import { Google, KeySquare, UserSquare } from 'iconsax-react'
import { useNavigate } from 'react-router-dom'
import { textInputSx } from './SignUpPage'

const buttonSx = {
  color: '#6741D9',
  textDecoration: 'underline',
  fontWeight: 500,
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}

const LoginPage = () => {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (value ? null : 'Hãy điền tên người dùng'),
      password: (value) => (value ? null : 'Hãy điền mật khẩu'),
    },
  })

  const onSubmit = (values: { username: string; password: string }) => {
    console.log('🚀 | LoginPage | values:', values)
  }

  const forgetPassword = () => {
    console.log('FORGET PASSWORD CLICKED!')
  }

  const logIn = () => {
    console.log(form.values)
  }

  const handleSuccess = (response: any) => {
    console.log(response)
  }

  const handleFailure = (error: any) => {
    console.error(error)
  }

  const navigateToSignUp = () => {
    navigate('/signup')
  }

  return (
    <Group
      sx={{ height: 844, width: 390, backgroundColor: '#F4F5FC' }}
      position='center'
    >
      <Stack sx={{ width: '100%', paddingInline: 20 }}>
        <Group position='center'>
          <Title sx={{ color: '#6741D9', fontWeight: 700 }} size={35}>
            Đăng nhập
          </Title>
        </Group>

        <Stack spacing={0}>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack spacing={10}>
              <TextInput
                label=''
                placeholder='Nhập tên người dùng'
                icon={<UserSquare size='18' />}
                sx={textInputSx}
                {...form.getInputProps('username')}
              />

              <TextInput
                label=''
                type='password'
                placeholder='Nhập mật khẩu'
                icon={<KeySquare size='18' />}
                sx={textInputSx}
                {...form.getInputProps('password')}
              />
            </Stack>

            <Group position='apart' my={10}>
              <Button variant='subtle' sx={buttonSx} onClick={navigateToSignUp}>
                Tạo tài khoản
              </Button>

              <Button variant='subtle' sx={buttonSx} onClick={forgetPassword}>
                Quên mật khẩu
              </Button>
            </Group>

            <Button
              variant='filled'
              sx={{
                color: 'white',
                backgroundColor: '#6741D9',
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: '#613eca',
                },
              }}
              fullWidth
              onClick={logIn}
            >
              Đăng nhập
            </Button>
          </form>

          <Divider
            my='xs'
            label='hoặc'
            labelPosition='center'
            color='#868E96'
          />

          {/* <Button
            leftIcon={<Google size={17} color='red' />}
            variant='outline'
            sx={{
              backgroundColor: 'transparent',
              color: '#212529',
              fontSize: 15,
              borderColor: '#DEE2E6',
            }}
          >
            Đăng nhập với Google
          </Button> */}

          {/* <GoogleLogin
            clientId='YOUR_CLIENT_ID'
            buttonText='Đăng nhập với Google'
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            prompt='select_account'
            cookiePolicy='single_host_origin'
            style={{
              backgroundColor: 'none',
              color: '#212529',
              fontSize: 15,
              borderColor: '#DEE2E6',
              textAlign: 'center',
            }}
          /> */}
        </Stack>
      </Stack>
    </Group>
  )
}

export default LoginPage
