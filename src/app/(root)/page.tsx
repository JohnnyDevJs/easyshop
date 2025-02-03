import { ProductList } from '@/components/shared/product/product-list'
import { getLatestProducts } from '@/lib/actions/product.actions'

export const metadata = {
  title: 'Home',
}

export default async function HomePage() {
  const latestProduct = await getLatestProducts()

  return <ProductList data={latestProduct} title="Novidades" limit={6} />
}
