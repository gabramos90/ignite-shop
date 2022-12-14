import { GetStaticProps } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/products'

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
      }
}

export default function Product({ product }: ProductProps){
    const { query } = useRouter()

    return(
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
const productId: params.id;

const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
})

const price = product.default_price as Stripe.Price

 return {
    props: {
        product: {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price.unit_amount / 100),
            description: product.description,
          }
    },
    revalidate: 60 * 60 * 1 // 1 hour
 }
}