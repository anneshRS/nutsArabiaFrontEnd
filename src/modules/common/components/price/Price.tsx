import React from "react"

export interface IPriceProps {
  product?: any
  card?: any
  originalPrice?: any
  discountedPrice?: any
}

const Price: React.FC<IPriceProps> = ({
  product,
  card,
  originalPrice,
  discountedPrice,
}) => {

  return (
    <div className="font-serif product-price font-bold ">
      {
        /* product.discount */ true ? (
          <span
            className={
              card
                ? "inline-block sm:text-lg text-sm font-semibold text-gray-800"
                : "inline-block text-2xl"
            }
          >
            {originalPrice}
            {/* {product.price.original_price} */}
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
        /* product.discount */ false ? (
          <del
            className={
              card
                ? "sm:text-sm text-xs font-normal text-gray-400 ml-1"
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
