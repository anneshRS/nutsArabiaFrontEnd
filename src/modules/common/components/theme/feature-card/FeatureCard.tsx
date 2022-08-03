import React from "react"
import { FiGift, FiTruck, FiPhoneCall, FiCreditCard } from "react-icons/fi"

const FeatureCard = () => {
  const featurePromo = [
    {
      id: 1,
      title: "Free Shipping",
      info: "From $500.00",
      icon: FiTruck,
    },
    {
      id: 2,
      title: "Support 24/7",
      info: "At Anytime",
      icon: FiPhoneCall,
    },
    {
      id: 3,
      title: "Secure Payment",
      info: "Totally Safe",
      icon: FiCreditCard,
    },
    {
      id: 4,
      title: "Latest Offer",
      info: "Upto 20% Off",
      icon: FiGift,
    },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 mx-auto">
      {featurePromo.map((promo) => (
        <div
          key={promo.id}
          className=" border-r border-gray-200 py-1 flex items-center justify-center bg-white"
        >
          <div className="mr-3">
            <promo.icon
              className="flex-shrink-0 h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div className="">
            <span className="block font-serif text-sm font-medium leading-5">
              {promo.title} {promo.info}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeatureCard
