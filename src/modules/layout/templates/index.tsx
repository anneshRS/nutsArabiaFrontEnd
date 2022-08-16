import React from "react"
import Head from "next/head"
import Nav from "@modules/layout/templates/nav"
import NavBar from "@modules/layout/templates/nav/Navbar"
import NavBarTop from "@modules/layout/templates/nav/NavbarTop"
import Footer from "@modules/layout/templates/footer/Footer"
import FooterTop from "@modules/layout/templates/footer/FooterTop"
import MobileFooter from "@modules/layout/templates/footer/MobileFooter"
import FeatureCard from "@modules/common/components/theme/feature-card/FeatureCard"
import { ToastContainer } from "react-toastify"

 interface IProductCardProps {
  title?: any
  description?: any
  children?:any
}

const Layout: React.FC<IProductCardProps> = ({ title, description, children }: IProductCardProps) => {
  return (
    // <div>
    //   <Nav />
    //   <main className="relative">{children}</main>
    //   <Footer />
    // </div>
    <>
      <ToastContainer />
      <div className="font-sans">
        <Head>
          <title>
            {title
              ? `KachaBazar | ${title}`
              : "KachaBazar - React Grocery & Organic Food Store e-commerce Template"}
          </title>
          {description && <meta name="description" content={description} />}
          <link ref="icon" href="/favicon.png" />
        </Head>
        <NavBarTop />
        <NavBar />
        <div className="bg-gray-50">{children}</div>
        {/* <main className="relative">{children}</main> */}
        <MobileFooter />
        <div className="w-full">
          <FooterTop />
          <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
            <FeatureCard />
          </div>
          <hr className="hr-line"></hr>
          <div className="border-t border-gray-100 w-full">
            <Footer />
          </div>
        </div>
        {/* <Footer /> */}
        {/* <Navbar />
      <div className="bg-gray-50">{children}</div>
      <MobileFooter />
      <div className="w-full">
        <FooterTop />
        <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
          <FeatureCard />
        </div>
        <hr className="hr-line"></hr>
        <div className="border-t border-gray-100 w-full">
          <Footer />
        </div>
      </div> */}
      </div>
    </>
  )
}

export default Layout
