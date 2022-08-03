import React from "react"

export interface IPriceProps {
  product: any
  card: any
}

const Price: React.FC<IPriceProps> = ({ product, card }) => {
  return (
    <div className="font-serif product-price font-bold">
      {
        /* product.discount */ true ? (
          <span
            className={
              card
                ? "inline-block text-lg font-semibold text-gray-800"
                : "inline-block text-2xl"
            }
          >
            {product.price.original_price}
          </span>
        ) : (
          <span
            className={
              card
                ? "inline-block text-lg font-semibold text-gray-800"
                : "inline-block text-2xl"
            }
          >
            {product.price.original_price}
          </span>
        )
      }
      {
        /* product.discount */ true ? (
          <del
            className={
              card
                ? "sm:text-sm font-normal text-base text-gray-400 ml-1"
                : "text-lg font-normal text-gray-400 ml-1"
            }
          >
            {product.price.original_price}
          </del>
        ) : null
      }
    </div>
  )
}

export default Price
