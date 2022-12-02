import { HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import Image from 'next/image'


import 'keen-slider/keen-slider.min.css'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[] // esse colchete no final indica que essa interface é de array
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <LI>
            <Product 
              href={`/product/${product.id}`} 
              key={product.id} 
              className='keen-slider__slide'
            >
              <Image src={product.imageUrl} width={520} height={480} alt='' />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
                {/* a formatacao do preço tambpem pode ser colocado aqui, o que gasta mais processamento pois recarrega toda vez que o projeto inicia */}
              </footer>
            </Product>
          </LI>
        )
      })}


    </HomeContainer>
  )
}

// essas quisições com ges sao condicionais e nao devem ser feitas em todos os momentos. Na maioria dos casos serão usados useEfect
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'] //quando é um lista,sempre data antes
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      // a formatacao do preço pode ser colocado aqui, o que gasta menos processamento pois recarrega a cada duas horas
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // a cada 2 horas o next recria o cache usando o acesso de outro usuário
  }
}

// meotodo getserversideprodps :  consigo ter acesso ao contexto da requisição
// quando eu migro para getstatics nao se tem mais acesso pois esse só roda quando o next cria uma versao statica daquela pagina //npm run build, ou seja se em algum momento essa página precisar de informações especíoficaas para cada usuáriop ela nao pode ser static pois deve ser igual a todos os users pq statis nao acessa contexto