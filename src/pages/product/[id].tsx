import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    // const router = useRouter() // => complemento do código da linha 32
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true);

             const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
             })   // nao criamos uma pasta lib para essse pois usa da mesma base de url   localhost 3000  

             const { checkoutUrl } = response.data;

             // router.push('/checkout') //=> para redirecionar o user a uma página interna

             window.location = checkoutUrl // => para redirecionar o user a uma página exterta
        } catch (err) {

            setIsCreatingCheckoutSession(false);

            // o certo seria conectar isso a alguma ferramenta de observabilidade (datadog ou sentry)
            alert('Falha ao redirecionar ao checkout')

        }
    }

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignit Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt='' />
                </ImageContainer>
    
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
    
                    <p>{product.description}</p>
                    <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
                        Comprar agora
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_MtWpHBJ40tXTwN' } }
        ],
        fallback: true, //carrega apagina sem a informação do produto e exectua o getstatic assynconramente, ai quando terminal de carregar os dados do produto ele preenche os dados do componente Product()
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

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
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}