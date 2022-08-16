import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import Price from "../price/Price"
import Stock from "../stock/Stock"
import MainModal from "./MainModal"
import { FiPlus, FiMinus } from "react-icons/fi"
import Tags from "../tags/tags"
import useAddToCart from "hooks/useAddToCart"
import {
  ProductProvider,
  useProductActions,
} from "@lib/context/product-context"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { medusaClient } from "@lib/config"
import { GetStaticProps } from "next"
import ProductCard from "@modules/products/templates/theme/ProductCard"

export interface IProductModalProps {
  productDetails?: any
  modalOpen: any
  setModalOpen: any
  productVariant?: any
  setCurrentDisplayableVariantPatent?: any
}

// const fetchProduct = async (handle: string) => {
//   return await medusaClient.products
//     .list({ handle }
//     .then(({ products }) => products[0])
// }

const ProductModal: React.FC<IProductModalProps> = ({
  productDetails,
  productVariant,
  modalOpen,
  setModalOpen,
  setCurrentDisplayableVariantPatent,
}: IProductModalProps) => {
  // const { handleAddItem, setItem, item } = useAddToCart()

  // const [item, setItem] = useState(1)

  // const {
  //   increaseQuantity,
  //   addToCart,
  //   decreaseQuantity,
  //   inStock,
  //   variant,
  //   quantity,
  // } = useProductActions()
  // console.log(item)
  // const { data, isError, isLoading, isSuccess } = useQuery(
  //   [`get_product`, productDetails.handle],
  //   () => fetchProduct(productDetails.handle),
  //   {
  //     enabled: productDetails.handle.length > 0,
  //     keepPreviousData: true,
  //   }
  // )
  // const product = data
  // console.log("queData", product)

  console.log("productDetails===========[ProductModal]=======>", productDetails)

  console.log(
    "productVariant===========[ProductModal]==========>",

    productVariant
  )

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col px-5 lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden gap-2 md:gap-3 lg:gap-3">
          {productVariant?.map((variant: any) => (
            <ProductCard
              key={productDetails.id}
              product={productDetails}
              isOnModal={true}
              variantId={variant.id}
              setCurrentDisplayableVariantPatent={
                setCurrentDisplayableVariantPatent
              }
            />
          ))}
        </div>
      </div>
    </MainModal>
  )
}

export default ProductModal
