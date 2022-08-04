import React, { useState, useMemo, createContext } from "react"

// create context
export interface ISidebarProviderProps {
  children: any
}

export interface ISidebarContextProps {
  cartDrawerOpen: any
  toggleCartDrawer: any
  closeCartDrawer: any
  setCartDrawerOpen: any
  categoryDrawerOpen: any
  toggleCategoryDrawer: any
  closeCategoryDrawer: any
  isModalOpen: any
  toggleModal: any
  closeModal: any
}

export const SidebarContext = createContext<ISidebarContextProps>({
  cartDrawerOpen: null,
  toggleCartDrawer: null,
  closeCartDrawer: null,
  setCartDrawerOpen: null,
  categoryDrawerOpen: null,
  toggleCategoryDrawer: null,
  closeCategoryDrawer: null,
  isModalOpen: null,
  toggleModal: null,
  closeModal: null,
})

export const SidebarProvider: React.FC<ISidebarProviderProps> = ({
  children,
}) => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen)
  const closeCartDrawer = () => setCartDrawerOpen(false)

  const toggleCategoryDrawer = () => setCategoryDrawerOpen(!categoryDrawerOpen)
  const closeCategoryDrawer = () => setCategoryDrawerOpen(false)

  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const closeModal = () => setIsModalOpen(false)

  const value: any = useMemo(
    () => ({
      cartDrawerOpen,
      toggleCartDrawer,
      closeCartDrawer,
      setCartDrawerOpen,
      categoryDrawerOpen,
      toggleCategoryDrawer,
      closeCategoryDrawer,
      isModalOpen,
      toggleModal,
      closeModal,
    }),

    [cartDrawerOpen, categoryDrawerOpen, isModalOpen]
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
