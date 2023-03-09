import {
  ActionIcon,
  Box,
  Card,
  createStyles,
  Image,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Musicnote, Play, SearchNormal1 } from "iconsax-react";

const CATES = [
  "Truyện Việt Nam",
  "Truyện nước ngoài",
  "Truyện cười",
  "Truyện dân gian",
];

const DEMO_IMG =
  "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1179&q=80";

const TOP20_STORIES = [
  { name: "Cô bé lọ lem", num: "11.2k lượt nghe" },
  { name: "Cô bé lọ lem", num: "11.2k lượt nghe" },
  { name: "Cô bé lọ lem", num: "11.2k lượt nghe" },
  { name: "Cô bé lọ lem", num: "11.2k lượt nghe" },
  { name: "Cô bé lọ lem", num: "11.2k lượt nghe" },
];

const LATEST_STORIES = [
  { name: "Cô bé lọ lem", date: "Tạo 1 ngày trước" },
  { name: "Cô bé lọ lem", date: "Tạo 1 ngày trước" },
  { name: "Cô bé lọ lem", date: "Tạo 1 ngày trước" },
  { name: "Cô bé lọ lem", date: "Tạo 1 ngày trước" },
  { name: "Cô bé lọ lem", date: "Tạo 1 ngày trước" },
];

const FAVOURITES = [
  { name: "Cô bé lọ lem", gerne: "Truyện cổ tích" },
  { name: "Cô bé lọ lem", gerne: "Truyện cổ tích" },
  { name: "Cô bé lọ lem", gerne: "Truyện cổ tích" },
  { name: "Cô bé lọ lem", gerne: "Truyện cổ tích" },
  { name: "Cô bé lọ lem", gerne: "Truyện cổ tích" },
];

const useStyles = createStyles((theme) => ({
  searchInput: {
    ".mantine-TextInput-input": {
      borderRadius: "10px",
      borderColor: theme.colors.gray[3],
      padding: "20px 45px",
      paddingRight: "10px",
    },
    ".mantine-TextInput-icon": {
      boxSizing: "content-box",
      margin: "0px 8px",
    },
  },
  sectionTitle: {
    margin: "20px 0 15px 0",
    h1: {
      fontSize: "18px",
      fontWeight: 700,
    },
    "::before": {
      content: '""',
      display: "block",
      float: "left",
      marginRight: "6px",
      width: "5px",
      height: "26px",
      borderRadius: "10px",
      backgroundColor: theme.colors.violet[8],
    },
  },
  cateContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "nowrap",
    overflow: "auto",
    maxWidth: "360px",
    "#cateItem": {
      minWidth: "150px",
      padding: "10px 15px",
      fontSize: "16px",
      color: "white",
      fontWeight: 700,
      height: "120px",
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1179&q=80')",
      backgroundSize: "cover",
      borderRadius: 10,
    },
  },
  topStoriesContainer: {
    display: "flex",
    overflow: "auto",
    maxWidth: "360px",
    gap: "10px",
    "#topStory": {
      padding: "0px",
      minWidth: "160px",
      height: "max-content",
      borderRadius: "10px",
      border: `1px solid ${theme.colors.violet[8]}`,

      "#playButton": {
        height: "100%",
        padding: "6px 4px",
        boxSizing: "content-box",
        background: theme.colors.violet[1],
        borderRadius: "10px",
      },
    },
  },

  favouritesContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "nowrap",
    overflow: "auto",
    maxWidth: "360px",
    "#favouriteItem": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      minWidth: "150px",
      padding: "10px 15px",
      div: {
        fontSize: "16px",
        color: "white",
        fontWeight: 700,
      },

      height: "120px",
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1179&q=80')",
      backgroundSize: "cover",
      borderRadius: 10,
    },
  },
}));

export const HomePage: React.FC = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <Box
      sx={{ padding: 20, overflow: "auto", maxHeight: "100%" }}
      pb={87}
      className="scrollbar-hide"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Text component="span" style={{ fontSize: 23, fontWeight: 700 }}>
            Xin chào,
          </Text>
          <Text
            component="span"
            style={{
              fontSize: 23,
              fontWeight: 700,
              color: theme.colors.violet[8],
            }}
          >
            &nbsp;người dùng
          </Text>
          <Text style={{ fontSize: 15 }}>Bạn muốn bé nghe gì hôm nay?</Text>
        </Box>
        <ActionIcon
          style={{
            background: theme.colors.violet[1],
            borderRadius: "50%",
            padding: "8px",
            boxSizing: "content-box",
          }}
        >
          <Musicnote color={theme.colors.violet[8]} size={18} />
        </ActionIcon>
      </Box>
      <Box mt="xs">
        <TextInput
          placeholder="Tìm truyện cho bé"
          icon={<SearchNormal1 size={22} color={theme.colors.gray[9]} />}
          className={classes.searchInput}
        />
      </Box>

      {/* cates */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>Danh mục nổi bật</Title>
        </Box>
        <Box className={classes.cateContainer}>
          {CATES.map((cate) => (
            <Card key={cate} id="cateItem">
              {cate}
            </Card>
          ))}
        </Box>
      </Box>

      {/* top20 */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>Top 20</Title>
        </Box>
        <Box className={classes.topStoriesContainer}>
          {TOP20_STORIES.map((story) => (
            <Card key={story.name} id="topStory">
              <Image height={100} src={DEMO_IMG} />
              <Box
                sx={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Text style={{ fontWeight: "bold" }}>{story.name}</Text>
                  <Text style={{ fontSize: "11px" }}>{story.num}</Text>
                </Box>
                <ActionIcon id="playButton">
                  <Play
                    size={18}
                    color={theme.colors.violet[8]}
                    variant="Bold"
                  />
                </ActionIcon>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      {/* favourites */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>Yêu thích của tôi</Title>
        </Box>
        <Box className={classes.favouritesContainer}>
          {FAVOURITES.map((item) => (
            <Card key={item.name} id="favouriteItem">
              <Text
                style={{ fontSize: "11px", color: `${theme.colors.gray[3]}` }}
              >
                {item.gerne}
              </Text>
              <Text>{item.name}</Text>
            </Card>
          ))}
        </Box>
      </Box>

      {/* top20 */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>Mới nhất</Title>
        </Box>
        <Box className={classes.topStoriesContainer}>
          {LATEST_STORIES.map((story) => (
            <Card key={story.name} id="topStory">
              <Image height={100} src={DEMO_IMG} />
              <Box
                sx={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Text style={{ fontWeight: "bold" }}>{story.name}</Text>
                  <Text style={{ fontSize: "11px" }}>{story.date}</Text>
                </Box>
                <ActionIcon id="playButton">
                  <Play
                    size={18}
                    color={theme.colors.violet[8]}
                    variant="Bold"
                  />
                </ActionIcon>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
