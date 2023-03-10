import {
  ActionIcon,
  Box,
  Card,
  createStyles,
  Image,
  Skeleton,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Musicnote, Play } from "iconsax-react";
import { useQuery } from "react-query";
import { SearchInput } from "../components/SearchInput";
import { BASE_URL, S3_URL } from "../constants";

const useStyles = createStyles((theme) => ({
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
      backgroundSize: "cover",
      borderRadius: 10,
    },
  },
}));

export const HomePage: React.FC = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const { data: catesData, isLoading: isCatesLoading } = useQuery(
    "api/cates",
    async () => {
      const response = await fetch(`${BASE_URL}/api/categories`);

      if (!response.ok) {
        throw new Error("Network response error");
      }

      return response.json();
    }
  );

  const { data: mostReadData, isLoading: isMostReadLoading } = useQuery(
    "api/mostRead",
    async () => {
      const params = {
        page: 1,
        limit: 20,
      };
      const queryParams = new URLSearchParams(params as any).toString();
      const response = await fetch(
        `${BASE_URL}/api/stories/most-read?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Network response error");
      }

      return response.json();
    }
  );

  return (
    <Box
      sx={{ padding: 20, overflow: "auto", maxHeight: "100%" }}
      pb={87}
      className="scrollbar-hide"
    >
      <Box mb="xs" sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Text component="span" style={{ fontSize: 23, fontWeight: 700 }}>
            Xin ch??o,
          </Text>
          <Text
            component="span"
            style={{
              fontSize: 23,
              fontWeight: 700,
              color: theme.colors.violet[8],
            }}
          >
            &nbsp;ng?????i d??ng
          </Text>
          <Text style={{ fontSize: 15 }}>B???n mu???n b?? nghe g?? h??m nay?</Text>
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

      <SearchInput />

      {/* cates */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>Danh m???c n???i b???t</Title>
        </Box>
        <Box className={classes.cateContainer}>
          {isCatesLoading ? (
            <Skeleton />
          ) : (
            catesData.map((cate: any) => (
              <Card
                component="a"
                href="/main"
                key={cate.key}
                id="cateItem"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${`${S3_URL}/${cate.banner}`})`,
                }}
              >
                {cate.title}
              </Card>
            ))
          )}
        </Box>
      </Box>

      {/* top20 */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>Top 20</Title>
        </Box>
        <Box className={classes.topStoriesContainer}>
          {isMostReadLoading ? (
            <Skeleton />
          ) : (
            mostReadData.stories.map((story: any) => (
              <Card key={story.title} component="a" href="/main" id="topStory">
                <Image height={100} src={`${S3_URL}/${story.banner}`} />
                <Box
                  sx={{
                    display: "flex",
                    padding: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Text style={{ fontWeight: "bold" }} lineClamp={1}>
                      {story.title}
                    </Text>
                    <Text style={{ fontSize: "11px" }}>
                      {story.listened} l?????t nghe
                    </Text>
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
            ))
          )}
        </Box>
      </Box>

      {/* favourites */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>Y??u th??ch c???a t??i</Title>
        </Box>
        <Box className={classes.favouritesContainer}>
          {isMostReadLoading || isCatesLoading ? (
            <Skeleton />
          ) : (
            mostReadData.stories.map((story: any) => (
              <Card
                component="a"
                href="/main"
                key={story._id}
                id="favouriteItem"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${`${S3_URL}/${story.banner}`})`,
                }}
              >
                <Text
                  style={{ fontSize: "11px", color: `${theme.colors.gray[3]}` }}
                >
                  {
                    catesData.find(
                      (item: any) => item.key === story.categories[0]
                    ).title
                  }
                </Text>
                <Text>{story.title}</Text>
              </Card>
            ))
          )}
        </Box>
      </Box>

      {/* latest */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>M???i nh???t</Title>
        </Box>
        <Box className={classes.topStoriesContainer}>
          {isMostReadLoading || isCatesLoading ? (
            <Skeleton />
          ) : (
            mostReadData.stories.map((story: any) => (
              <Card key={story._id} component="a" href="main" id="topStory">
                <Image height={100} src={`${S3_URL}/${story.banner}`} />
                <Box
                  sx={{
                    display: "flex",
                    padding: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Text style={{ fontWeight: "bold" }} lineClamp={1}>
                      {story.title}
                    </Text>
                    <Text style={{ fontSize: "11px" }}>???? t???o h??m nay</Text>
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
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};
