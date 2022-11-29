import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

globalStyles();

import logoImg from '../assets/logo-shop.svg'

export default function App ({ Component, pageProps }: AppProps) {

  return (
    <div>
      <img src={logoImg.src} alt="" />

      <Component {...pageProps} />
    </div>
  )
}


// todas as paginas estao carregando esse app => ele funciona como um wrapper