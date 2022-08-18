import React, { useContext } from "react"
import dynamic from "next/dynamic"
import Drawer from "rc-drawer"
import { SidebarContext } from "@modules/common/components/context/SidebarContext"
import Cart from "@pages/cart"

//internal import

const CartDrawer = () => {
  const { cartDrawerOpen, closeCartDrawer } = useContext(SidebarContext)

  return (
    <Drawer
      open={cartDrawerOpen}
      onClose={closeCartDrawer}
      // parent={null}
      level={null}
      placement={"right"}
    >
      <Cart />
    </Drawer>
  )
}
export default dynamic(() => Promise.resolve(CartDrawer), { ssr: false })
