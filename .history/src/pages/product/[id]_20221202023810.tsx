import { useRouter } from 'next/router'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/products'

export default function Product(){
    const { query } = useRouter()

    return(
        <ProductContainer>
            <ImageContainer>

            </ImageContainer>

            <ProductDetails>
                <h1></h1>
            </ProductDetails>
        </ProductContainer>
    )
}