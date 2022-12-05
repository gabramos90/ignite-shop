import { GetStaticProps } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useRouter } from 'next/router'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/products'

export default function Product(){
    const { query } = useRouter()

    return(
        <ProductContainer>
            <ImageContainer>

            </ImageContainer>

            <ProductDetails>
                <h1>Camiseta X</h1>
                <span>R$ 94,90</span>

                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, eligendi animi, nihil maxime reiciendis dolorum eius cum repellat fuga nesciunt natus neque delectus! Ratione culpa perferendis libero eaque temporibus consectetur.</p>

                <button>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
const productId: params.id;

const product = await stripe.products.retrieve(productId)

 return {
    props: {},
    revalidate: 60 * 60 * 1 // 1 hour
 }
}