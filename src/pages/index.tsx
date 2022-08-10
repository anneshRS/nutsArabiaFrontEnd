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

const Home: NextPageWithLayout = () => {
  const { data } = useFeaturedProductsQuery()
  console.log("alldata", data)
  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at the ACME. Worldwide Shipping. Secure Payment."
      />
      <StickyCart />
      <Hero />
      {/* <FeaturedProducts /> */}
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
