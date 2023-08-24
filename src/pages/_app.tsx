import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "@/styles/pages/app";

import Image from "next/image";

import logoImg from "../assets/logo.png";
import { Footer, Header } from "@/styles/pages/Home";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <Container>
      <Header href={`../`}>
        {/* <Image src={logoImg} alt={'image.alt'} width={150}  /> */}
      </Header>
      <Component {...pageProps} />
      <Footer> 
        <div>Developed by: <b>Lucas Moreira</b></div>
        <div><a href="https://github.com/LucasSNM/"> Github Link</a></div>
      </Footer>
    </Container>
  );
}
