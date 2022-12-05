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

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
const productId: params.id;

const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
})

const price = product.default_price as Stripe.Price

 return {
    props: {
        product: {
            {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      // a formatacao do preço pode ser colocado aqui, o que gasta menos processamento pois recarrega a cada duas horas
    }
        }
    },
    revalidate: 60 * 60 * 1 // 1 hour
 }
}