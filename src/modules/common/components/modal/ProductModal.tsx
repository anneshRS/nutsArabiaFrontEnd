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

export interface IProductModalProps {
  productDetails: any
  modalOpen: any
  setModalOpen: any
}
const fetchProduct = async (handle: string) => {
  return await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
}

const ProductModal: React.FC<IProductModalProps> = ({
  productDetails,
  modalOpen,
  setModalOpen,
}: IProductModalProps) => {
  // const { handleAddItem, setItem, item } = useAddToCart()
  // const [item, setItem] = useState(1)
  const {
    increaseQuantity,
    addToCart,
    decreaseQuantity,
    inStock,
    variant,
    quantity,
  } = useProductActions()
  // console.log(item)

  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, productDetails.handle],
    () => fetchProduct(productDetails.handle),
    {
      enabled: productDetails.handle.length > 0,
      keepPreviousData: true,
    }
  )
  const product = data
  console.log("queData", product)

  return (
    // <ProductProvider product={product}>
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden">
          <Link href={`/product/${productDetails.handle}`} passHref>
            <div
              onClick={() => setModalOpen(false)}
              className="flex-shrink-0 flex items-center justify-center h-auto cursor-pointer"
            >
              <Image
                src={productDetails.thumbnail}
                width={420}
                height={420}
                alt={productDetails.title}
              />
            </div>
          </Link>
          <div className="w-full flex flex-col p-5 md:p-8 text-left">
            <div className="mb-2 md:mb-2.5 block -mt-1.5">
              <Link href={`/product/${productDetails.handle}`} passHref>
                <h1
                  onClick={() => setModalOpen(false)}
                  className="text-heading text-lg md:text-xl lg:text-2xl font-semibold font-serif hover:text-black cursor-pointer"
                >
                  {productDetails.title}
                </h1>
              </Link>
              <Stock product={productDetails} />
              <p className="text-sm leading-6 text-gray-500 md:leading-6">
                {productDetails.description}
              </p>
            </div>
            <p className="text-sm leading-6 text-gray-500 md:leading-6">
              {productDetails.description}
            </p>
            <div className="flex items-center mt-4">
              <Price product={productDetails} />
            </div>

            <div className="flex items-center mt-4">
              <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                  <button
                    // onClick={() => setItem(item - 1)}
                    // onClick={decreaseQuantity}
                    // disabled={item === 1}
                    // disabled={quantity === 1}
                    className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                  >
                    <span className="text-dark text-base">
                      <FiMinus />
                    </span>
                  </button>
                  <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                    {/* {quantity} */}
                  </p>
                  <button
                    // onClick={() => setItem(item + 1)}
                    // onClick={increaseQuantity}
                    // disabled={
                    // product.quantity < item || product.quantity === item
                    // productDetails.quantity < quantity ||
                    // productDetails.quantity === quantity
                    // }
                    className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                  >
                    <span className="text-dark text-base">
                      <FiPlus />
                    </span>
                  </button>
                </div>
                <button
                  // onClick={() => handleAddItem(product)}
                  // onClick={addToCart}
                  // disabled={productDetails.quantity < 1}
                  className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <span className="font-serif font-semibold py-1 text-sm d-block">
                <span className="text-gray-700">Category:</span>{" "}
                <span className="text-gray-500">{productDetails.children}</span>
              </span>
              {/* <Tags product={product} /> */}
            </div>
          </div>
        </div>
      </div>
    </MainModal>
    // </ProductProvider>
  )
}

export default ProductModal
