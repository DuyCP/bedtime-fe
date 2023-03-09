import { Box, Button, createStyles, Image, Text } from '@mantine/core'
import { ArrowRight } from 'iconsax-react'

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.violet[5],
    width: 400,
    height: 844,
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: 'white',
    fontSize: '26px',
    fontWeight: 800,
  },
  description: {
    color: 'white',
    fontSize: '18px',
  },
  button: {
    fontWeight: 700,
    fontSize: '18px',
    borderRadius: '10px',
    border: `1px solid ${theme.colors.gray[3]}`,
    padding: '8px 30px',
    boxSizing: 'content-box',
    backgroundColor: theme.colors.violet[4],
    width: 'fit-content',
    ':hover': {
      backgroundColor: theme.colors.violet[4],
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: '1 1',
  },
}))

export const OnboardingPage: React.FC = () => {
  const { classes } = useStyles()

  return (
    <Box className={classes.main}>
      <Image src='/onboarding-image.png' alt='onboarding image' />
      <Box px={20} className={classes.contentWrapper}>
        <Box>
          <Text className={classes.title} mt='xs' align='center'>
            Hơn 500 mẫu truyện hàng đầu Việt Nam và Thế Giới
          </Text>
          <Text className={classes.description} mt='xs' align='center'>
            Kể bởi AI, làm đẹp giấc mơ con trẻ
          </Text>
        </Box>

        <Button component='a' href='/home' className={classes.button}>
          Nghe nào &nbsp; <ArrowRight size={28} />
        </Button>
      </Box>
    </Box>
  )
}
