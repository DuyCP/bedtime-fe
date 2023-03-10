import { Box, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { Heart, Home, SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const MENU_LIST = [
  { label: "Trang chủ", value: "home", link: "/home", Icon: Home },
  { label: "Tìm kiếm", value: "search", link: "/search", Icon: SearchNormal1 },
  { label: "Đã thích", value: "like", link: "/like", Icon: Heart },
];

const Layout = () => {
  const [menu, setMenu] = useState(MENU_LIST[0].value);
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
