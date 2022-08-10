import React from "react"

interface ILabelProps{
  label:any
}

const Label:React.FC<ILabelProps> = ({ label }:ILabelProps) => {
  return (
    <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
      {label}
    </label>
  )
}

export default Label
