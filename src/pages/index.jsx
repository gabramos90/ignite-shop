import { HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'

import Image from 'next/image'

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png' 

import 'keen-slider/keen-slider.min.css'

export default function Home(props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return(
    <HomeContainer ref={sliderRef} className="keen-slider">
      <pre>{JSON.stringify(props.list)}</pre>

      <Product className='keen-slider__slide'>
        <Image src={camiseta1} width={520} height={480} alt=''/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={camiseta2} width={520} height={480} alt=''/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={camiseta3} width={520} height={480} alt=''/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={camiseta3} width={520} height={480} alt=''/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

// nem toda requisição sera feita no getServer,  pois isso deixa o site lento

export const getServerSideProps = async () => { // essa função carrega todos os dados de uma vez só, então nao vai existir estado de loading
  await new Promise(resolver => setTimeout(resolver, 2000)) // simular delay do navegador (hack)

  return {
    props: {
      list: [1, 2, 3]
    }
  }
}
// só vamos usar essa opção para informaçoes que precisam estar em tela assim que a aplicação fo carregada, SOMENTE APLICAÇÕES CRUCIAIS! => . PARA INDEXADROES, CROWLER E BOTS.