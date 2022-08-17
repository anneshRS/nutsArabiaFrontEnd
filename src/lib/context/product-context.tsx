import { canBuy } from "@lib/util/can-buy"
import { findCheapestPrice } from "@lib/util/prices"
import isEqual from "lodash/isEqual"
import { formatVariantPrice, useCart } from "medusa-react"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
// import { Variant  } from "types/medusa"
import { Product, Variant } from "types/medusa"
import { useStore } from "./store-context"

interface ProductContext {
  formattedPrice: string
  quantity: number
  disabled: boolean
  inStock: boolean
  variant?: Variant
  maxQuantityMet: boolean
  options: Record<string, string>
  updateOptions: (options: Record<string, string>) => void
  increaseQuantity: () => void
  decreaseQuantity: () => void
  addToCart: () => void
}

const ProductActionContext = createContext<ProductContext | null>(null)

interface ProductProviderProps {
  children?: React.ReactNode
  product: Product
}

export const ProductProvider = ({
  product,
  children,
}: ProductProviderProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [options, setOptions] = useState<Record<string, string>>({})
  const [maxQuantityMet, setMaxQuantityMet] = useState<boolean>(false)
  const [inStock, setInStock] = useState<boolean>(true)

  const { addItem } = useStore()
  const { cart } = useCart()
  console.log("context", product)
  const { variants } = product
  console.log("variants", variants)

  useEffect(() => {
    // initialize the option state
    const optionObj: Record<string, string> = {}
    for (const option of product?.options) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    console.log("useEffect=======optionObj", optionObj)
    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}
    console.log("variantRecord 1", variants)
    for (const variant of variants) {
      const tmp: Record<string, string> = {}
      console.log("variantRecord 2", variant)
      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }
      console.log("variantRecord 3", tmp)
      map[variant.id] = tmp
    }
    console.log("map", map)
    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined
    console.log("in variant 1", variantRecord)
    console.log("in variant 2", options)
    for (const key of Object.keys(variantRecord)) {
      console.log(variantRecord[key], "===================", options)
      console.log("isEqual", isEqual(variantRecord[key], options))
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }
    console.log("variantId", variantId)
    console.log(
      "variants.find",
      variants.find((v: any) => v.id === variantId)
    )
    return variants.find((v: any) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  const disabled = useMemo(() => {
    return !variant
  }, [variant])

  // memoized function to get the price of the current variant
  const formattedPrice = useMemo(() => {
    if (variant && cart?.region) {
      return formatVariantPrice({ variant, region: cart.region })
    } else if (cart?.region) {
      return findCheapestPrice(variants, cart.region)
    } else {
      // if no variant is selected, or we couldn't find a price for the region/currency
      return "N/A"
    }
  }, [variant, variants, cart])

  useEffect(() => {
    if (variant) {
      setInStock(canBuy(variant))
    }
  }, [variant])

  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  const addToCart = () => {
    console.log("addItem", variant /* .id */, quantity)
    if (variant) {
      addItem({
        variantId: variant.id,
        quantity,
      })
    }
  }

  const increaseQuantity = () => {
    console.log("inventoryQuan", variant?.inventory_quantity)
    const maxQuantity = variant?.inventory_quantity || 0
    console.log("maxQuan", maxQuantity)
    console.log("quantity", quantity)
    if (maxQuantity > quantity + 1) {
      setQuantity(quantity + 1)
    } else {
      setMaxQuantityMet(true)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)

      if (maxQuantityMet) {
        setMaxQuantityMet(false)
      }
    }
  }
  console.log("variant", variant)
  return (
    <ProductActionContext.Provider
      value={{
        quantity,
        maxQuantityMet,
        disabled,
        inStock,
        options,
        variant,
        addToCart,
        updateOptions,
        decreaseQuantity,
        increaseQuantity,
        formattedPrice,
      }}
    >
      {children}
    </ProductActionContext.Provider>
  )
}

export const useProductActions = () => {
  const context = useContext(ProductActionContext)
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider"
    )
  }
  return context
}
