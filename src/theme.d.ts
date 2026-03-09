import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      profileContainerBg: string;
      modalBackground: string;
      tweetLogo: string;
      cardExplorer: string;
      iconDefault: string;
      textHighlight: string;
    };
  }

  interface ThemeOptions {
    custom?: {
      profileContainerBg?: string;
      modalBackground?: string;
      tweetLogo?: string;
      cardExplorer?: string;
      iconDefault?: string;
      iconEllipse?: string;
      iconFooter?: string;
      iconLike?: string;
      iconClose?: string;
      textHighlight?: string;
      trendingTopicsBg?: string;
    };
  }
}
