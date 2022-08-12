import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "react-query"

const MainCarousel = () => {
  const queryResults = useQuery("repoData", () =>
    fetch("http://localhost:1337/api/nuts-arabia-banners?populate=image").then((res) =>
      res.json()
    )
  )
  console.log("queryResults--->", queryResults)


  /* const strapiData = queryResults.data.data.map((res:any)=>{
    return {id:res.id,...res.attribiutes}
    // return {res}
  })
  console.log("strapiData---",strapiData) */
  const sliderData = [
    {
      id: 1,
      title: "The Best Quality Products Guaranteed!",
      info: "Dramatically facilitate effective total linkage for go forward processes...",
      url: "/search?Category=biscuits--cakes",
      image: "/slider/slider-1.jpg",
    },
    {
      id: 2,
      title: "Best Different Type of Grocery Store",
      info: "Quickly aggregate empowered networks after emerging products...",
      url: "/search?Category=fish--meat",
      image: "/slider/slider-2.jpg",
    },
    {
      id: 3,
      title: "Quality Freshness Guaranteed!",
      info: "Intrinsicly fashion performance based products rather than accurate benefits...",
      url: "/search?category=fresh-vegetable",
      image: "/slider/slider-3.jpg",
    },
  ]
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {queryResults?.data?.data?.map((item: any, i: any) => (
          <SwiperSlide
            className="h-full relative rounded-lg overflow-hidden"
            key={i + 1}
          >
            <div className="text-sm text-gray-600 hover:text-emerald-dark">
              <Image
                layout="responsive"
                width={950}
                height={400}
                src={"http://localhost:1337"+item.attributes.image.data[0].attributes.url}
                alt={item.attributes.title}
                className="object-cover"
              />
            </div>
            <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
              <div className="pl-4 pr-12 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12">
                <h1 className="mb-2 font-serif text-xl sm:text-lg md:text-2xl line-clamp-1 md:line-clamp-none  lg:line-clamp-none  lg:text-3xl font-bold text-gray-800">
                  {item.attributes.title}
                </h1>
                <p className="text-base leading-6 text-gray-600 font-sans line-clamp-1  md:line-clamp-none lg:line-clamp-none">
                  {item.attributes.info}
                </p>
                <Link href={item.attributes.url}>
                  <a className="hidden sm:inline-block lg:inline-block text-sm leading-6 font-serif font-medium mt-6 px-6 py-2 bg-emerald-500 text-center rounded-md text-white hover:bg-emerald-600">
                    Shop Now
                  </a>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default MainCarousel
