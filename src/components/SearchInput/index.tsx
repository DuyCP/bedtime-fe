import { Box, createStyles, TextInput, useMantineTheme } from "@mantine/core";
import { SearchNormal1 } from "iconsax-react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputFocus = () => {
    if (location.pathname === "/home") navigate("/search");
  };
  return (
    <Box>
      <TextInput
        onFocus={() => handleInputFocus()}
        placeholder="Tìm truyện cho bé"
        icon={<SearchNormal1 size={22} color={theme.colors.gray[9]} />}
        className={classes.searchInput}
      />
    </Box>
  );
};
