'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'

import { generatePublicImageBusinessLink } from '@/lib/utils'
import { PublicBusinessDetail } from '@/services/apis/types'

function BusinessViewCarousel({ businessData }: { businessData: PublicBusinessDetail }) {
  const [image, setImage] = useState<string | null>(null)
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<any>(null)

  const DEFAULT_IMAGE = '/images/pages/home/poster.png'
  const images = businessData?.gallery?.length ? businessData.gallery : [DEFAULT_IMAGE]
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 🔹 Auto-scroll (5s) with pause/resume
  useEffect(() => {
    if (!api) return

    const start = () => {
      if (intervalRef.current) return
      intervalRef.current = setInterval(() => {
        api.scrollNext()
      }, 5000)
    }

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    // start initially
    start()

    // pause on interaction
    api.on('pointerDown', stop)
    api.on('mouseenter', stop)

    // resume after interaction
    api.on('pointerUp', start)
    api.on('mouseleave', start)

    return () => {
      stop()
      api.off('pointerDown', stop)
      api.off('mouseenter', stop)
      api.off('pointerUp', start)
      api.off('mouseleave', start)
    }
  }, [api])

  return (
    <>
      <ScreenWrapper className="pt-6">
        {/* Carousel */}
        <div className="relative w-full overflow-hidden rounded-xl shadow-sm border border-gray-100">
        <Carousel
          opts={{ loop: true }}
          className="group w-full"
          setApi={(carouselApi) => {
            if (!carouselApi) return
            setApi(carouselApi)

            setCurrent(carouselApi.selectedScrollSnap())
            carouselApi.on('select', () => {
              setCurrent(carouselApi.selectedScrollSnap())
            })
          }}
        >
          <CarouselContent>
            {images.map((galleryItem, index) => {
              const urlStr = typeof galleryItem === 'string' ? galleryItem : galleryItem?.media_url
              const imgUrl = urlStr === DEFAULT_IMAGE ? DEFAULT_IMAGE : generatePublicImageBusinessLink(urlStr)

              return (
                <CarouselItem key={index} className="w-full">
                  <div
                    className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full flex items-center justify-center cursor-zoom-in bg-black"
                    onClick={() => setImage(imgUrl)}
                  >
                    <img
                      src={imgUrl}
                      alt={`${businessData?.business?.display_name || 'Business'} ${index}`}
                      className="h-full w-full object-contain object-center"
                    />

                    {/* Dots (Bottom Right) - only show when multiple images */}
                    {images.length > 1 && (
                      <div className="absolute bottom-3 right-3 flex gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                        {images.map((_, i) => (
                          <span
                            key={i}
                            className={`h-2 w-2 rounded-full transition-all ${
                              current === i
                                ? 'bg-white w-4'
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-white/80 hover:bg-white" />
              <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-white/80 hover:bg-white" />
            </>
          )}
        </Carousel>
      </div>
      </ScreenWrapper>

      {/* Fullscreen Preview */}
      <Dialog open={!!image} onOpenChange={() => setImage(null)}>
        <DialogContent className="flex items-center justify-center border-none bg-black/95 p-4 shadow-none">
          <DialogHeader hidden>
            <DialogTitle hidden>Image Preview</DialogTitle>
            <DialogDescription hidden />
          </DialogHeader>

          <div className="flex items-center justify-center w-full h-full">
            {image && (
              <img
                src={image}
                alt="Preview"
                draggable={false}
                className="max-h-[95vh] max-w-[98vw] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BusinessViewCarousel