import BannerComponent from '@/components/BannerComponent'
import PopularEbooks from '@/components/PopularEbooks'
import PopularHardBook from '@/components/PopularHardBook'
import TrendingEbooks from '@/components/TrendingEbooks'
import TrendingHardBook from '@/components/TrendingHardBook'

export const metadata = {
    title: 'Banner',
}

export default function Banner() {
    return (
        <>
            <BannerComponent />
            <div className="px-2 sm:6">
                <section className="mt-8">
                    <h4 className="text-2xl font-bold mb-2">
                        Trending E-Books
                    </h4>
                    <TrendingEbooks />
                </section>
                <section className="mt-8">
                    <h4 className="text-2xl font-bold mb-2">Popular E-Books</h4>
                    <PopularEbooks />
                </section>
                <section className="mt-8">
                    <h4 className="text-2xl font-bold mb-2">
                        Trending Hard Books
                    </h4>
                    <TrendingHardBook />
                </section>
                <section className="mt-8">
                    <h4 className="text-2xl font-bold mb-2">
                        Popluar Hard Books
                    </h4>
                    <PopularHardBook />
                </section>
            </div>
        </>
    )
}
