/* eslint-disable @typescript-eslint/no-explicit-any */
type ProductListProps = {
  data: any
  title: string
  limit?: number
}

export function ProductList({ data, title, limit }: ProductListProps) {
  const limitedData = limit ? data.slice(0, limit) : data
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitedData.map((product: any) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  )
}
