import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

globalStyles();

import logoImg from '../assets/logo-shop.svg'
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";

export default function App ({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg.src} alt="" width={100} height={100}/>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}


// todas as paginas estao carregando esse app => ele funciona como um wrapper