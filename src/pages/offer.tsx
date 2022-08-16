import { ReactElement } from "react"
import Layout from "@modules/layout/templates"
import Coupon from "@modules/products/components/coupon/Coupon"
import PageHeader from "@modules/products/components/header/PageHeader"
import { NextPageWithLayout } from "types/global"

const Offer: NextPageWithLayout = () => {
  return (
    <>
      <PageHeader title="Mega Offer" />
      <div className="mx-auto max-w-screen-2xl px-4 py-10 lg:py-20 sm:px-10">
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <Coupon />
        </div>
      </div>
    </>
  )
}

Offer.getLayout = (page: ReactElement) => {
  return (
    <Layout title="Offer" description="this is discount page">
      {page}
    </Layout>
  )
}

export default Offer
