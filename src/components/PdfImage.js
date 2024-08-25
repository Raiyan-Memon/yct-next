import Image from 'next/image'

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

const toBase64 = str =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)

export default function PdfImage(props) {
    return (
        <>
            <div className="h-[170px] sm:h-[200px] md:h-[230px] lg:h-[290px]  select-none">
                <Image
                    className="hover:scale-[1.01] duration-700 transition opacity-50 h-full"
                    alt={props.image}
                    loading="lazy"
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    // fill
                    width={500}
                    height={500}
                    src={props.image}
                    onLoadingComplete={image =>
                        image.classList.remove('opacity-50')
                    }
                />
            </div>
        </>
    )
}
