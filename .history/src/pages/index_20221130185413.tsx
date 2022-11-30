import { HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import { GetServerSideProps } from 'next'

import Image from 'next/image'

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png' 

import 'keen-slider/keen-slider.min.css'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

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


export const getServerSideProps: GetServerSideProps = async () => { 
  const response = await stripe.products.list({
    expand: ['data.default_price'] //quando é um lista,sempre data antes
  })


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    }
  })

  return {
    props: {
      list: [1, 2, 3]
    }
  }
}
