import React from "react"

import CategoryWrapper from "./CategoryWrapper"
import ProductWrapper from "./ProductWrapper"

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <ProductWrapper />
      <CategoryWrapper />
    </div>
  )
}

export default page