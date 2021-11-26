import Head from 'next/head';
import React from 'react';
import '../styles/styles.scss';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>YellowBoard</title>
        <meta property="og:title" content="Yellowboard academy" />
        <meta
          property="og:image"
          content="https://media.discordapp.net/attachments/906891142602305606/906911978646290452/yellowboard-removebg-preview1.png"
        />
        <meta
          property="og:url"
          content="https://www.yellowboard.avocadosnetwork.com"
        />
        <meta
          property="og:description"
          content="Bienvenido a yellowboad academy, donde podrás poner a prueba tus habilidades de primaria o tus hijos podrán reforzar sus conocimientos de primaria para la escuela."
        />
        <meta
          name="keywords"
          content="yellowboard, board, yellow, webapp, react"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="/assets/icons/top.png"
          sizes="96x96"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/icons/top.png"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
          crossorigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="/assets/icons/top.png"
          sizes="96x96"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/icons/top.png"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
          crossorigin="anonymous"
        />
      </Head>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
}
export default MyApp;
