'use client'

import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import PdfImage from './PdfImage'
import { FreeMode, Navigation } from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'

export default function RelatedEbook(props) {
    const [loading, setLoading] = useState(true)
    const [ebooks, setEbooks] = useState([])

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    async function get() {
        await csrf()
        axios
            .get(`/api/v1/ebook/related-ebook?category_id=${props.categoryId}`)
            .then(response => {
                setEbooks(response.data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(true)
            })
    }

    useEffect(() => {
        if (props.categoryId) {
            setLoading(true)
            get()
        }
    }, [props.categoryId])

    return (
        <>
            <p className="mt-10">Related Ebooks</p>
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
                <div className="flex mb-10">
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
                        {ebooks.map((ele, index) => (
                            <SwiperSlide key={index}>
                                <div>
                                    <Link href={`/banner/${ele.id}`}>
                                        <PdfImage image={ele.pdf_front} />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    )
}
