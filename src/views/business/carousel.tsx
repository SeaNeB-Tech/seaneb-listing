'use client'
import { useState } from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { generatePublicImageBusinessLink } from '@/lib/utils'
import { BusinessDetailsAPIResponse } from '@/types/business'

function BusinessViewCarousel({ businessData }: { businessData: BusinessDetailsAPIResponse }) {
  const [image, setImage] = useState<string | null>(null)

  return (
    <>
      <Carousel
        opts={{
          loop: true,

          align: 'start'
        }}
        className='group relative mt-0 w-full'
      >
        <CarouselContent>
          {businessData?.shop_galleries?.map((gallery, index) => (
            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <div
                onClick={() => setImage(generatePublicImageBusinessLink(gallery?.link))}
                className='flex h-96 cursor-zoom-in items-center justify-center rounded-md bg-transparent'
              >
                <img
                  alt={`${businessData?.business_legal_name} - ${index}`}
                  src={generatePublicImageBusinessLink(gallery?.link)}
                  className='h-full w-full object-cover'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        <CarouselNext className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        <Dialog open={!!image} onOpenChange={() => setImage(null)}>
          <DialogContent className='flex items-center justify-center border-none bg-transparent p-0 shadow-none outline-none'>
            <DialogHeader hidden>
              <DialogTitle hidden>Share link</DialogTitle>
              <DialogDescription hidden>Anyone who has this link will be able to view this.</DialogDescription>
            </DialogHeader>
            <img
              alt='Image'
              src={image ?? undefined}
              draggable={false}
              className='h-auto max-h-full w-auto cursor-default rounded-lg object-cover shadow-lg lg:max-w-4xl'
              onClick={e => {
                e?.preventDefault()
                e?.stopPropagation()
              }}
            />
          </DialogContent>
        </Dialog>
      </Carousel>
    </>
  )
}

export default BusinessViewCarousel
