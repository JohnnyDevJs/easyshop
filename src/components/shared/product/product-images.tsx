'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/utils'

type ProductImagesProps = {
  images: string[]
}

export function ProductImages({ images }: ProductImagesProps) {
  const [current, setCurrent] = useState<number>(0)

  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="Imagem do produto"
        width={1000}
        height={1000}
        className="min-h=[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              'mr-2 cursor-pointer border hover:border-orange-600',
              current === index && 'border-orange-500',
            )}
          >
            <Image src={image} alt="Imagem" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  )
}
