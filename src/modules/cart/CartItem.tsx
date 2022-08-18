import { useContext } from "react"
import Link from "next/link"
// import { useCart } from "react-use-cart"
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi"
import Image from "next/image"
import { SidebarContext } from "@modules/common/components/context/SidebarContext"
import LineItemPrice from "@modules/common/components/line-item-price"
import { CalculatedVariant } from "types/medusa"
import getDisplayableprice from "@services/PriceService"
import { useStore } from "@lib/context/store-context"

//internal import
// import useAddToCart from "@hooks/useAddToCart"
// import { SidebarContext } from "@context/SidebarContext"

export interface ICartItemProps {
  item: any
  cart: any
}

const CartItem: React.FC<ICartItemProps> = ({ item, cart }) => {
  // const { updateItemQuantity, removeItem } = useCart()
  const { closeCartDrawer } = useContext(SidebarContext)
  // const { handleIncreaseQuantity } = useAddToCart()
  const { deleteItem } = useStore()

  return (
    <div className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0">
      <div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4">
        <Image
          key={item.id}
          src={item.thumbnail}
          width={40}
          height={40}
          alt={item.title}
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <Link href={`/product/${item.slug}`}>
          <a
            onClick={closeCartDrawer}
            className="truncate text-sm font-medium text-gray-700 text-heading line-clamp-1"
          >
            {item.title}
          </a>
        </Link>
        <span className="text-xs text-gray-400 mb-1">
          {/* Item Price ${item.unit_price} */}
          {`Item Price ${item.variant.prices[0].currency_code.toUpperCase()} ${getDisplayableprice(
            item.variant.prices[0].amount
          )}`}
        </span>
        <div className="flex items-center justify-between">
          <div className="font-bold text-sm md:text-base text-heading leading-5">
            {/* <span>${(item.price * item.quantity).toFixed(2)}</span> */}
            <LineItemPrice
              region={cart.region}
              variant={item.variant as CalculatedVariant}
              quantity={item.quantity}
              style="tight"
            />
          </div>
          <div className="h-8 w-22 md:w-24 lg:w-24 flex flex-wrap items-center justify-evenly p-1 border border-gray-100 bg-white text-gray-600 rounded-md">
            <button
            // onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              <span className="text-dark text-base">
                <FiMinus />
              </span>
            </button>
            <p className="text-sm font-semibold text-dark px-1">
              {item.quantity}
            </p>
            <button /* onClick={() => handleIncreaseQuantity(item)} */>
              <span className="text-dark text-base">
                <FiPlus />
              </span>
            </button>
          </div>
          <button
            // onClick={() => removeItem(item.id)}
            onClick={() => deleteItem(item.id)}
            className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
