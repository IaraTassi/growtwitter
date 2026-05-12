export type AppLinkProps = {
  to: string;
  children: React.ReactNode;
};

export type MobileTweetButtonProps = {
  userImageUrl?: string;
  onSubmit: (content: string) => Promise<void>;
};
