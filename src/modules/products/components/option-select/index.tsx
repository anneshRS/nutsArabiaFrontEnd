import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"
import React from "react"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      {/* <span className="text-base-semi">Select {title}</span> */}
      <div className="mt-4">
        <h3 className="text-base font-semibold mb-1 font-serif">
          Select {title}
        </h3>
      </div>
      {/* <div className="grid grid-cols-3 lg:grid-cols-6 gap-2"> */}
      <div className="flex">
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => {
                updateOption({ [option.id]: v })
                console.log("selectedOptions", { [option.id]: v })
              }}
              key={v}
              // className={clsx(
              //   "border-gray-200 border text-xsmall-regular h-[50px] transition-all duration-200",
              //   { "border-gray-900": v === current }
              // )}
              className={`${
                // selectedVariant.id === variant.id
                v === current ? "border-green-500" : "hover:border-orange-500"
              } flex flex-row border items-center rounded-md justify-center  w-20 h-12 mr-2`}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
