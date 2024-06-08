import { Box, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import sidebarData from "../constants/sidebarData";

const Sidebar = () => {
  const pathName = useLocation();

  return (
    <>
      <nav>
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: "none", md: "block" },
            flexShrink: 0,

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              position: "relative",
              background: "#D7E0D8",
              marginTop:"20px"
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          open
        >
          <div className="my-10 flex  justify-center">
            <p className="text-[2rem] font-bold text-[#1D1D1D]">My Profile</p>
          </div>
          <Box
            className="-mt-4 lg:ml-2"
            left="20"
            top="50"
            bottom="20"
            sx={{
              "@media screen and (min-width:960px)": {
                height: "100vh",
                position: "sticky",
              },
            
            }}
          >
            <List>
              {sidebarData.map((item) => {
                return (
                  <ListItem key={item.id}>
                    <ListItemButton>
                      <Link
                        to={item.path}
                        className={`lg:h-10 2xl:h-16 w-full lg:py-2 2xl:py-4 ${
                          item.path == pathName?.pathname
                            ? "bg-white rounded-lg"
                            : ""
                        }`}
                        key={item.id}
                        // passHref={true}
                      >
                        <div className="flex  pb-16 ">
                          <p className="lg:text-sm 2xl:text-lg 2xl:ml-10 lg:ml-7 font-medium text-start">
                            {item.itemName}
                          </p>
                        </div>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      </nav>
    </>
  );
};
export default Sidebar;
