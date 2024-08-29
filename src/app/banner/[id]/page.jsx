'use client'

import RelatedEbook from '@/components/RelatedEbook'
import axios from '@/lib/axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function BannerDetails({ params }) {
    const [banner, setBanner] = useState({})
    const [loading, setLoading] = useState(true)

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    async function bannerDetails() {
        await csrf()
        axios
            .post('/api/v1/ebook/ebook-detail', {
                ebook_id: params.id,
            })
            .then(response => {
                console.log(response.data.data)
                setBanner(response.data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        bannerDetails()
    }, [])

    return (
        <>
            <div className="container">
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <div>
                        <h3>Title : {banner.title}</h3>
                        <h3>Description : {banner.description}</h3>
                        <h3>Category : {banner.category_id}</h3>
                        <Image
                            alt="loading"
                            width={200}
                            height={200}
                            src={banner.pdf_front}
                        />
                    </div>
                )}
                <RelatedEbook categoryId={banner.category_id} />
            </div>
        </>
    )
}
