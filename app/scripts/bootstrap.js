import { injectGlobal } from 'emotion';

injectGlobal`
    html {
        font-size: 62.5%;
        overflow-y: visible;
    }

    body {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        line-height: 1.4;
        letter-spacing: 0.15em
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%
    }

    li {
        lsit-style: none;
    }
`;
