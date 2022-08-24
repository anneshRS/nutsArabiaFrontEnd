import Price from "@modules/common/components/price/Price"
import Image from "next/image"
import React, { useState } from "react"
import { IoBagAddSharp } from "react-icons/io5"

const AllProducts = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <div className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative">
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className="relative flex justify-center w-full cursor-pointer"
        >
          {
            /* product.quantity */ 12 <= 0 && (
              <span className="absolute inline-flex items-center justify-center px-2 py-1 bg-red-100 text-red-600 border-0 rounded-full text-xs font-semibold font-serif z-10 left-4 top-4">
                Stock Out
              </span>
            )
          }
          {/* <Discount product={product} /> */}

          <Image
            src={/* product.thumbnail */ ""}
            width={160}
            height={160}
            alt={/* product.title */ ""}
            className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
          />
        </div>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {/* product.unit */ "each"}
            </span>
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2">{/* product.title */ "hey"}</span>
            </h2>
          </div>
          <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
            <Price /* product={product}  */card={true} />
            <button
              //   onClick={() => handleAddItem(product)}
              disabled={/* product.quantity */ 12 < 1}
              aria-label="cart"
              className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
            >
              <span className="text-xl">
                <IoBagAddSharp />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProducts
