import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import Price from "@modules/common/components/price/Price"
import Stock from "@modules/common/components/stock/Stock"
import Layout from "@modules/layout/templates"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi"
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
import Card from "../components/slug-card/Card"
import getDisplayableprice from "@services/PriceService"
import { useProductActions } from "@lib/context/product-context"

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const router = useRouter()
  const [displayableImage, setDisplayableImage] = useState(product.images[0])
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  console.log(selectedVariant)

  // const info = useRef<HTMLDivElement>(null)

  // const inView = useIntersection(info, "0px")

  return (
    // <ProductProvider product={product}>
    //   <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
    //     <div className="flex flex-col gap-y-8 w-full">
    //       <ImageGallery images={product.images} />
    //     </div>
    //     <div
    //       className="small:sticky small:top-20 w-full py-8 small:py-0 small:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12"
    //       ref={info}
    //     >
    //       <ProductInfo product={product} />
    //       <ProductTabs product={product} />
    //     </div>
    //   </div>
    //   <div className="content-container my-16 px-6 small:px-8 small:my-32">
    //     <RelatedProducts product={product} />
    //   </div>
    //   <MobileActions product={product} show={!inView} />
    // </ProductProvider>
    // <Layout title={product.title} description={product.description}>
    <div className="px-0 py-10 lg:py-10">
      <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
        <div className="flex items-center pb-4">
          <ol className="flex items-center w-full overflow-hidden font-serif">
            <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="text-sm mt-[1px]">
              <FiChevronRight />
            </li>
            <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold ">
              {/* <Link
                  href={`/search?category=${product.children
                    .toLowerCase()
                    .replace("&", "")
                    .split(" ")
                    .join("-")}`}
                > */}
              {/* <a>{product.children}</a> */}
              <a>childProduct</a>
              {/* </Link> */}
            </li>
            <li className="text-sm mt-[1px]">
              {" "}
              <FiChevronRight />{" "}
            </li>
            <li className="text-sm px-1 transition duration-200 ease-in ">
              {product.title}
            </li>
          </ol>
        </div>
        <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
          <div className="flex flex-col xl:flex-row">
            <div>
              {product.images.map((img: any) => {
                return (
                  <div
                    key={img.id}
                    className={`${
                      displayableImage.id === img.id
                        ? "border-green-500"
                        : "border-slate-500  hover:border-orange-500"
                    }  flex m-2 items-center rounded-sm border h-20 w-16 content-center`}
                    onClick={() => setDisplayableImage(img)}
                  >
                    <Image
                      src={img.url}
                      alt={img.title}
                      // layout="fit"
                      width={60}
                      height={60}
                      priority
                    ></Image>
                  </div>
                )
              })}
            </div>

            <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12">
              {/* <Discount product={product} slug={true} /> */}

              <Image
                src={displayableImage.url}
                alt={product.title}
                layout="responsive"
                width={650}
                height={650}
                priority
              ></Image>
            </div>
            <div className="w-full">
              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                <div className="w-full md:w-7/12 md:pr-4 lg:pr-4 xl:pr-12">
                  <div className="mb-6">
                    <h1 className="leading-7 text-lg md:text-xl lg:text-2xl mb-1 font-semibold font-serif text-gray-800">
                      {product.title}
                    </h1>
                    {/* <p className="uppercase font-serif font-medium text-gray-500 text-sm">
                      SKU :{" "}
                      <span className="font-bold text-gray-600">
                        {product.sku
                          ? product.sku
                          : product._id.substring(18, 24)}
                      </span>
                    </p> */}
                  </div>
                  <Price
                    product={product}
                    originalPrice={`${selectedVariant.prices[0].currency_code.toUpperCase()} ${getDisplayableprice(
                      selectedVariant.prices[0].amount
                    )}`}
                  />
                  <div className="mb-4 md:mb-5 block">
                    <Stock product={product} />
                  </div>
                  <div>
                    <p className="text-sm leading-6 text-gray-500 md:leading-7">
                      {product.description}
                    </p>
                    <div className="mt-4">
                      <h3 className="text-base font-semibold mb-1 font-serif">
                        Select Quantity
                      </h3>
                    </div>
                    <div className="flex">
                      {product.variants.map((variant: any) => {
                        return (
                          <div
                            key={variant.id}
                            className={`${
                              selectedVariant.id === variant.id
                                ? "border-green-500"
                                : "hover:border-orange-500"
                            } flex flex-row border items-center rounded-md justify-center  w-20 h-12 mr-2 `}
                            onClick={() => setSelectedVariant(variant)}
                          >
                            <div className="text-gray-500">
                              {variant.options.map(
                                (innerData: any) => innerData.value
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                        <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                          <button
                            // onClick={() => setItem(item - 1)}
                            // disabled={item === 1}
                            className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                          >
                            <span className="text-dark text-base">
                              <FiMinus />
                            </span>
                          </button>
                          <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-16 xl:w-16">
                            {/* {item} */} {"2"}
                          </p>
                          <button
                            // onClick={() => setItem(item + 1)}
                            // disabled={
                            //   product.quantity < item ||
                            //   product.quantity === item
                            // }
                            className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                          >
                            <span className="text-dark text-base">
                              <FiPlus />
                            </span>
                          </button>
                        </div>
                        <button
                          // onClick={() => handleAddItem(product)}
                          onClick={() => addToCart()}
                          // disabled={product.quantity < 1}
                          className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col mt-4">
                      <span className="font-serif font-semibold py-1 text-sm d-block">
                        <span className="text-gray-700">Category:</span>{" "}
                        <span className="text-gray-500">{"childProduct"}</span>
                      </span>
                      {/* <Tags product={product} /> */}
                    </div>
                    <div className="mt-8">
                      <h3 className="text-base font-semibold mb-1 font-serif">
                        Share your social network
                      </h3>
                      <p className="font-sans text-sm text-gray-500">
                        For get lots of traffic from social network share this
                        product
                      </p>
                      <ul className="flex mt-4">
                        <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                          <FacebookShareButton
                            url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                            quote="KachaBazar"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                        </li>
                        <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                          <TwitterShareButton
                            url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                            quote="KachaBazar"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                        </li>
                        <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                          <RedditShareButton
                            url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                            quote="KachaBazar"
                          >
                            <RedditIcon size={32} round />
                          </RedditShareButton>
                        </li>
                        <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                          <WhatsappShareButton
                            url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                            quote="KachaBazar"
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                        </li>
                        <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                          <LinkedinShareButton
                            url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                            quote="KachaBazar"
                          >
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                  <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                    <Card />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  )
}

export default ProductTemplate
