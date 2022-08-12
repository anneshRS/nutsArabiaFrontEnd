import { medusaClient } from "@lib/config"
import { ProductProvider } from "@lib/context/product-context"
import ProductModal from "@modules/common/components/modal/ProductModal"
import Price from "@modules/common/components/price/Price"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { IoBagAddSharp, IoAdd, IoRemove } from "react-icons/io5"
import { useQuery } from "react-query"
import { formatVariantPrice, useCart } from "medusa-react"
import { ChevronDownIcon } from "@heroicons/react/outline"

export interface IProductCardProps {
  product: any
}

const ProductCard: React.FC<IProductCardProps> = ({
  product,
}: IProductCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { cart } = useCart()
  const [variant, setVariant] = useState([])
  const [currentDisplayableVariant, setCurrentDisplayableVariant] =
    useState<any>({})

  const fetchProduct = async (handle: string) => {
    return await medusaClient.products
      .list({ handle })
      .then(({ products }) => products[0])
  }
  console.log("first", cart?.items)
  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, product.handle],
    () => fetchProduct(product.handle),
    {
      enabled: product.handle.length > 0,
      keepPreviousData: true,
    }
  )

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      let variant: any = data.variants
      setVariant(variant)
      setCurrentDisplayableVariant(variant[0])
    }
  }, [data])

  console.log("vari", variant)

  console.log("Newdata", data)
  // console.log("quan", product.title)
  return (
    <>
      {data && Object.keys(data).length > 0 && (
        <>
          <ProductModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            productDetails={variant}
            // productVariant={variant}
          />

          <div className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 my-2 flex-col items-center bg-white relative">
            <div
              // onClick={() => setModalOpen(!modalOpen)}
              className="relative flex justify-center w-full cursor-pointer pt-2"
            >
              {product.quantity <= 0 && (
                <span className="absolute inline-flex items-center justify-center px-2 py-1 bg-red-100 text-red-600 border-0 rounded-full text-xs font-semibold font-serif z-10 left-4 top-4">
                  Stock Out
                </span>
              )}
              {/* <Discount product={product} /> */}

              <Image
                src={product.thumbnail}
                width={160}
                height={160}
                alt={product.title}
                className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
              />
            </div>
            <div className="w-full px-3 lg:px-4 py-2 overflow-hidden">
              <div className="relative mb-1">
                {/* <span className="text-gray-400 font-medium text-xs d-block mb-1">
                each
                </span> */}
                <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
                  <span className="line-clamp-2">{product.title}</span>
                </h2>
              </div>

              {/* <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
                <Price product={product} card={true} />
              </div> */}
            </div>

            <div className="flex w-full justify-between items-center px-3 lg:px-4 pb-2">
              <div
                className="flex justify-content items-center border border-gray-200 rounded shadow hover:border-emerald-500 px-2"
                onClick={() => setModalOpen(!modalOpen)}
              >
                <span className="h-9 w-auto flex items-center justify-center transition-all">
                  {currentDisplayableVariant &&
                    Object.keys(currentDisplayableVariant).length > 0 &&
                    currentDisplayableVariant.options &&
                    currentDisplayableVariant.options.length > 0 &&
                    currentDisplayableVariant.options[0]?.value}
                </span>

                <ChevronDownIcon
                  className="ml-1 h-3 w-3 group-hover:text-emerald-600"
                  aria-hidden="true"
                />
              </div>
              <button
                // onClick={() => handleAddItem(product)}
                // disabled={product.quantity < 1}
                aria-label="cart"
                className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow"
              >
                <span className="text-xl">
                  <IoBagAddSharp />
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductCard
