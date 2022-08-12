import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import StickyCart from "@modules/cart/templates/theme/StickyCart"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import ProductCard from "@modules/products/templates/theme/ProductCard"
// import NavBarTop from "../modules/layout/templates/nav/navbarTop"
import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { fetchProductsList, getCollectionData, getSiteData } from "@lib/data"
import Banner from "@modules/products/components/banner/Banner"
import MainCarousel from "@modules/products/components/carousel/MainCarousel"
import OfferCard from "@modules/products/components/offer/OfferCard"

const Home: NextPageWithLayout = () => {
  const { data } = useFeaturedProductsQuery()
  // const {  } = getSiteData()

  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at the ACME. Worldwide Shipping. Secure Payment."
      />
      <StickyCart />
      {/* <Hero /> */}
      {/* <FeaturedProducts /> */}
      <div className="bg-white">
        <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
          <div className="flex w-full">
            <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
              <MainCarousel />
            </div>
            <div className="w-full hidden lg:flex">
              <OfferCard />
            </div>
          </div>
          <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
            <Banner />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-full">
          {/* <FeaturedProducts /> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
            {data &&
              data.map((productDetails) => (
                <ProductCard key={productDetails.id} product={productDetails} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
