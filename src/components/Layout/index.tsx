import { Box, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MENU_LIST } from "../../constants";

const Layout = () => {
  const location = useLocation();
  const activePage = location.pathname;
  const theme = useMantineTheme();

  return (
    <Box id="layout" sx={{ minWidth: 400, position: "relative" }}>
      <Outlet />

      <Flex
        sx={{
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          padding: "10px",
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "#ECEEF9",
          paddingTop: 10,
        }}
        mx="auto"
        justify="space-around"
        mt="auto"
      >
        {MENU_LIST.map(({ link, label, Icon }) => {
          const isActive = link === activePage;
          const menuColor = isActive
            ? theme.colors.violet[8]
            : theme.colors.gray[6];
          return (
            <Link
              key={link}
              to={link}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <Stack spacing={4.5} align="center">
                <Icon
                  variant={isActive ? "Bold" : "Outline"}
                  color={menuColor}
                />

                <Text
                  sx={{
                    textDecoration: "none",
                    fontWeight: isActive ? 800 : 600,
                    fontSize: 13,
                    color: menuColor,
                  }}
                >
                  {label}
                </Text>
              </Stack>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Layout;
