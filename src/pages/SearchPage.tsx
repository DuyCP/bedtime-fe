import {
  Box,
  createStyles,
  Skeleton,
  Title,
  useMantineTheme,
  Card,
} from "@mantine/core";
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
    gap: "10px",
    display: "grid",
    gridTemplateColumns: "auto auto",
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
}));

export const SearchPage: React.FC = () => {
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
  return (
    <Box
      sx={{ padding: 20, overflow: "auto", maxHeight: "100%" }}
      pb={87}
      className="scrollbar-hide"
    >
      <SearchInput />

      {/* cates */}
      <Box>
        <Box className={classes.sectionTitle}>
          <Title order={1}>Danh mục nổi bật</Title>
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
    </Box>
  );
};
