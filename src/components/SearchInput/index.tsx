import { Box, createStyles, TextInput, useMantineTheme } from "@mantine/core";
import { SearchNormal1 } from "iconsax-react";

const useStyles = createStyles((theme) => ({
  searchInput: {
    ".mantine-TextInput-input": {
      borderRadius: "10px",
      borderColor: theme.colors.gray[3],
      padding: "20px 45px",
      paddingRight: "10px",
      ":focus": {
        borderColor: theme.colors.violet[6],
      },
    },
    ".mantine-TextInput-icon": {
      boxSizing: "content-box",
      margin: "0px 8px",
    },
  },
}));

export const SearchInput = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <Box>
      <TextInput
        placeholder="Tìm truyện cho bé"
        icon={<SearchNormal1 size={22} color={theme.colors.gray[9]} />}
        className={classes.searchInput}
      />
    </Box>
  );
};
