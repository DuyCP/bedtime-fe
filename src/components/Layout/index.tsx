import { Box, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HeartIcon from "../../icons/HeartIcon";
import HomeIcon from "../../icons/HomeIcon";
import SearchIcon from "../../icons/SearchIcon";

const MENU_LIST = [
  { label: "Trang chủ", value: "home", link: "/", Icon: HomeIcon },
  { label: "Tìm kiếm", value: "search", link: "/search", Icon: SearchIcon },
  { label: "Đã thích", value: "like", link: "/like", Icon: HeartIcon },
];

const Layout = () => {
  const [menu, setMenu] = useState(MENU_LIST[0].value);
  const theme = useMantineTheme();

  return (
    <Box id="layout" sx={{ minWidth: 360, position: "relative" }}>
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
        {MENU_LIST.map(({ link, value, label, Icon }) => {
          const isActive = value === menu;
          const menuColor = isActive
            ? theme.colors.violet[8]
            : theme.colors.gray[6];
          return (
            <Link
              key={value}
              to={link}
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => setMenu(value)}
            >
              <Stack spacing={4.5} align="center">
                <Icon color={menuColor} />

                <Text
                  sx={{
                    textDecoration: "none",
                    fontWeight: isActive ? 700 : 600,
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
