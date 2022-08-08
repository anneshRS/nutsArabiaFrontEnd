import React, { useContext } from "react"
import dynamic from "next/dynamic"
import Category from "@modules/common/components/category/Category"
import Drawer from "rc-drawer"
import { SidebarContext } from "@modules/common/components/context/SidebarContext"

const CategoryDrawer = () => {
  const { categoryDrawerOpen, closeCategoryDrawer } = useContext(SidebarContext)

  return (
    <Drawer
      open={categoryDrawerOpen}
      onClose={closeCategoryDrawer}
      //   parent={null}
      level={null}
      placement={"left"}
    >
      <Category />
    </Drawer>
  )
}
export default dynamic(() => Promise.resolve(CategoryDrawer), { ssr: false })
