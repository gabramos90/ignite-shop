import { useRouter } from 'next/router'
import { ProductContainer } from '../../styles/pages/products'

export default function Product(){
    const { query } = useRouter()

    return(
        <ProductContainer
    )
}