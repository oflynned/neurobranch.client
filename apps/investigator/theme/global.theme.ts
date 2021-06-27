import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Lato";
    src: url("/static/fonts/Lato/Lato-Regular.ttf");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
  
  @font-face {
    font-family: "Lato";
    src: url("/static/fonts/Lato/Lato-Light.ttf");
    font-style: normal;
    font-weight: 200;
    font-display: swap;
  }
  
  @font-face {
    font-family: "Lato";
    src: url("/static/fonts/Lato/Lato-Bold.ttf");
    font-style: normal;
    font-weight: 600;
    font-display: swap;
  }
  
  @font-face {
    font-family: "Roboto";
    src: url("/static/fonts/Roboto/Roboto-Regular.ttf");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
  
  @font-face {
    font-family: "Roboto";
    src: url("/static/fonts/Roboto/Roboto-Light.ttf");
    font-style: normal;
    font-weight: 200;
    font-display: swap;
  }
  
  @font-face {
    font-family: "Roboto";
    src: url("/static/fonts/Roboto/Roboto-Bold.ttf");
    font-style: normal;
    font-weight: 600;
    font-display: swap;
  }
`;
