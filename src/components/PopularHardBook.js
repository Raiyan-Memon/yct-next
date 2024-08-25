'use client'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import axios from '@/lib/axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import Image from 'next/image'
import PdfImage from './PdfImage'
import { FreeMode, Navigation } from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function PopularHardBook() {
    const [ebook, setEbook] = useState([])
    const [loading, setLoading] = useState(true)

    function getBooks() {
        axios
            .get('/api/v1/book/popular-books')
            .then(response => {
                setEbook(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getBooks()
    }, [])
    return (
        <>
            {loading ? (
                <div className="grid sm:grid-cols-5 grid-cols-3  gap-5">
                    <div>
                        <Skeleton className="h-[150px] sm:h-[300px]" />
                    </div>
                    <div>
                        <Skeleton className="h-[150px] sm:h-[300px]" />
                    </div>
                    <div>
                        <Skeleton className="h-[150px] sm:h-[300px]" />
                    </div>
                    <div className="sm:block hidden">
                        <Skeleton className="h-[150px] sm:h-[300px]" />
                    </div>
                    <div className="sm:block hidden">
                        <Skeleton className="h-[150px] sm:h-[300px]" />
                    </div>
                </div>
            ) : (
                <div className="flex">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        navigation={true}
                        freeMode={true}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            '@0.75': {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            '@1.00': {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            '@1.50': {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Navigation, FreeMode]}
                        className="mySwiper">
                        {ebook.map((ele, index) => (
                            <SwiperSlide key={index}>
                                <button>
                                    <PdfImage image={ele.cover_image} />
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    )
}
