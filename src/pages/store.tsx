import { StoreGetProductsParams } from "@medusajs/medusa"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { useMemo, useState } from "react"
import { NextPageWithLayout } from "types/global"
import { useInfiniteQuery } from "react-query"
import { fetchProductsList } from "@lib/data"
import { useCart } from "medusa-react"
import usePreviews from "@lib/hooks/use-previews"
import ProductCard from "@modules/products/templates/theme/ProductCard"

const Store = () => {
  const [params, setParams] = useState<StoreGetProductsParams>({})
  const { cart } = useCart()

  const queryParams = useMemo(() => {
    const p: StoreGetProductsParams = {}

    if (cart?.id) {
      p.cart_id = cart.id
    }

    p.is_giftcard = false

    return {
      ...p,
      ...params,
    }
  }, [cart?.id, params])

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )
  const previews = usePreviews({ pages: data?.pages, region: cart?.region })
  console.log("preview", previews)

  return (
    <>
      <Head title="Store" description="Explore all of our products." />
      <div className="flex flex-col small:flex-row small:items-start py-6">
        <RefinementList refinementList={params} setRefinementList={setParams} />
        {/* <InfiniteProducts params={params} /> */}
        <div className="flex">
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
              {previews && previews.length > 0
                ? previews.map((productDetails) => (
                    <ProductCard
                      key={productDetails.id}
                      product={productDetails}
                    />
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Store.getLayout = (page) => <Layout>{page}</Layout>

export default Store
