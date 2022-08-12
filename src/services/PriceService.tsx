import React from "react"

const getDisplayableprice = (amount: any) => {
  let stringifyedAmount = amount.toString()
  let beforeDot = stringifyedAmount.substring(0, stringifyedAmount.length - 2)
  let afterDot = stringifyedAmount.substring(
    stringifyedAmount.length - 2,
    stringifyedAmount.length
  )
  return `${beforeDot}.${afterDot}`
}

export default getDisplayableprice
