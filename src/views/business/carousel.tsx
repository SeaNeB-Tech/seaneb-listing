'use client'
import { useState } from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function BusinessViewCarousel() {
  const [image, setImage] = useState<string | null>(null)

  return (
    <>
      <Carousel
        opts={{
          loop: true,

          align: 'start'
        }}
        className='group relative mt-4 w-full'
      >
        <CarouselContent>
          {Array.from({ length: 7 }).map((_, index) => (
            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
              <div
                onClick={() => setImage(`/images/pages/business/single-listing-0${index + 1}.jpg`)}
                className='flex h-96 cursor-zoom-in items-center justify-center rounded-md bg-transparent'
              >
                <img
                  alt={'Image ' + index}
                  src={`/images/pages/business/single-listing-0${index + 1}.jpg`}
                  className='h-full w-full object-cover'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        <CarouselNext className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        <Dialog open={!!image} onOpenChange={() => setImage(null)}>
          <DialogContent className='flex h-[90vh] items-center justify-center border-none bg-transparent p-0 outline-none lg:max-w-4xl'>
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
