import { Box } from "@mui/material";
import { SidebarNavItem } from "./SideBarNavItem";
import { HomeIcon } from "../utils/icons/HomeIcon";
import { ExplorerIcon } from "../utils/icons/ExplorerIcon";
import { ProfileIcon } from "../utils/icons/ProfileIcon";
import { PrimaryButton } from "./PrimaryButton";
import { Logo } from "../utils/icons/Logo";
import { SidebarUser } from "./SideBarUser";

export function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
        position: "sticky",
        top: 0,
        marginRight: 2,
        py: 3,
      }}
    >
      <Box display="flex" flexDirection="column">
        <Box>
          <Logo />
        </Box>

        <SidebarNavItem icon={<HomeIcon />} label="Página Inicial" to="/app" />

        <SidebarNavItem
          icon={<ExplorerIcon />}
          label="Explorar"
          to="/app/explorer"
        />

        <SidebarNavItem
          icon={<ProfileIcon />}
          label="Perfil"
          to="/app/profile"
        />

        <Box>
          <PrimaryButton sx={{ width: 162, height: 28 }}>Tweetar</PrimaryButton>
        </Box>
      </Box>

      <SidebarUser
        name={"User Teste"}
        userName={"user.teste"}
        onLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Box>
  );
}
