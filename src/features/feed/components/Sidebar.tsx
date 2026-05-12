import { Box } from "@mui/material";
import { SidebarNavItem } from "./SideBarNavItem";
import { HomeIcon } from "../utils/icons/HomeIcon";
import { ExplorerIcon } from "../utils/icons/ExplorerIcon";
import { ProfileIcon } from "../utils/icons/ProfileIcon";
import { PrimaryButton } from "./PrimaryButton";
import { Logo } from "../utils/icons/Logo";
import { SidebarUser } from "./SideBarUser";
import { useAppDispatch } from "../../../hooks/redux";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { ComposerModal } from "./ComposerModal";
import { useState } from "react";
import { createTweetThunk } from "../store/feedThunks";
import { logout } from "../../auth/store/authSlice";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [openComposer, setOpenComposer] = useState(false);

  const handleCreateTweet = async (content: string) => {
    await dispatch(createTweetThunk(content));
    handleCloseComposer();
  };

  const handleOpenComposer = () => {
    setOpenComposer(true);
  };

  const handleCloseComposer = () => {
    setOpenComposer(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

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
        p: 3,
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
          to={`/app/profile/${user?.id}`}
        />

        <Box>
          <PrimaryButton
            onClick={handleOpenComposer}
            sx={{ width: 162, height: 28, mt: 1 }}
          >
            Tweetar
          </PrimaryButton>
        </Box>
      </Box>

      <SidebarUser
        userId={user?.id ?? ""}
        name={user?.name ?? ""}
        userName={user?.userName ?? ""}
        imageUrl={user?.imageUrl}
        onLogout={handleLogout}
      />
      <ComposerModal
        open={openComposer}
        onClose={handleCloseComposer}
        userImageUrl={user?.imageUrl}
        onSubmit={handleCreateTweet}
        submitLabel="Tweetar"
      />
    </Box>
  );
}
