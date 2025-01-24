import { ProductList } from '@/components/shared/product/product-list'
import { sampleData } from '@/db/sample-data'

export const metadata = {
  title: 'Home',
}

export default function HomePage() {
  return <ProductList data={sampleData.products} title="Novidades" limit={4} />
}
