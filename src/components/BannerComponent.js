'use client'

import axios from '@/lib/axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

// import required modules
import { Skeleton } from './ui/skeleton'

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)

export default function BannerComponent() {
    const [banner, setBanner] = useState([])
    const [loading, setLoading] = useState(true)

    function getBanner() {
        axios
            .get('/api/v1/basic/get-banner')
            .then(response => {
                setBanner(response.data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getBanner()
    }, [])

    return (
        <>
            {loading ? (
                <Skeleton className="h-[200px] rounded-none sm:h-[600px]" />
            ) : (
                <div className="flex">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            '@0.75': {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            '@1.00': {
                                slidesPerView: 1,
                                spaceBetween: 40,
                            },
                            '@1.50': {
                                slidesPerView: 1,
                                spaceBetween: 50,
                            },
                        }}
                        className="mySwiper">
                        {banner.map((ele, index) => (
                            <SwiperSlide key={index}>
                                <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[550px] w-[200px]">
                                    <Image
                                        className=" duration-700 transition opacity-50"
                                        alt={ele.image}
                                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                        loading="lazy"
                                        layout="fill"
                                        src={ele.image}
                                        onLoadingComplete={image =>
                                            image.classList.remove('opacity-50')
                                        }
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    )
}
