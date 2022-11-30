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

  return(
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <pro
        )
      })}
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
      price: price.unit_amount / 100,
    }
  })

  return {
    props: {
      products,
    }
  }
}
