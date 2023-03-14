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
import GoogleLogin from 'react-google-login'

export const textInputSx = {
  '& .mantine-Input-input': {
    height: 45,
  },
}

const SignUpPage = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      username: (value) => (value ? null : 'Hãy điền tên người dùng'),
      password: (value) => (value ? null : 'Hãy điền mật khẩu'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Mật khẩu chưa khớp' : null,
    },
  })

  const onSubmit = (values: { username: string; password: string }) => {
    console.log('🚀 | SignUpPage | values:', values)
  }

  const forgetPassword = () => {
    console.log('FORGET PASSWORD CLICKED!')
  }

  const signUp = () => {
    console.log(form.values)
  }

  const handleSuccess = (response: any) => {
    console.log(response)
  }

  const handleFailure = (error: any) => {
    console.error(error)
  }

  return (
    <Group
      sx={{ height: 844, width: 390, backgroundColor: '#F4F5FC' }}
      position='center'
    >
      <Stack sx={{ width: '100%', paddingInline: 20 }}>
        <Group position='center'>
          <Title sx={{ color: '#6741D9', fontWeight: 700 }} size={35}>
            Tạo tài khoản
          </Title>
        </Group>

        <Stack spacing={0}>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack spacing={10} mb={10}>
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

              <TextInput
                label=''
                type='password'
                placeholder='Nhập lại mật khẩu'
                icon={<KeySquare size='18' />}
                sx={textInputSx}
                {...form.getInputProps('confirmPassword')}
              />
            </Stack>

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
              onClick={signUp}
            >
              Tạo tài khoản
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
            Tạo tài khoản với Google
          </Button> */}

          <GoogleLogin
            clientId='YOUR_CLIENT_ID'
            buttonText='Tạo tài khoản với Google'
            prompt='select_account'
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy='single_host_origin'
            style={{
              backgroundColor: 'none',
              color: '#212529',
              fontSize: 15,
              borderColor: '#DEE2E6',
              textAlign: 'center',
            }}
          />
        </Stack>
      </Stack>
    </Group>
  )
}

export default SignUpPage
