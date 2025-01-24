import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type ProductPriceProps = HTMLAttributes<HTMLDivElement> & {
  value: number
}

export function ProductPrice({ value, ...rest }: ProductPriceProps) {
  const stringValue = value.toFixed(2)

  const [intValue, floatValue] = stringValue.split('.')

  return (
    <p className={cn('text-2xl', rest.className)}>
      <span className="align-super text-xs">R$</span>
      {intValue}
      <span className="align-super text-xs">,{floatValue}</span>
    </p>
  )
}
