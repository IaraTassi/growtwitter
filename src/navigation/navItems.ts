import { ExplorerIcon } from "../features/feed/utils/icons/ExplorerIcon";
import { HomeIcon } from "../features/feed/utils/icons/HomeIcon";
import { ProfileIcon } from "../features/feed/utils/icons/ProfileIcon";

export const getNavItems = (userId?: string) => [
  {
    label: "Página Inicial",
    to: "/app",
    icon: HomeIcon,
  },
  {
    label: "Explorar",
    to: "/app/explorer",
    icon: ExplorerIcon,
  },
  {
    label: "Perfil",
    to: userId ? `/app/profile/${userId}` : "/login",
    icon: ProfileIcon,
  },
];
