'use client'
import { addProductsToDataBase } from "@/actions/serverActions";
import { useTransition } from "react"

const AddProductButton = () => {
    const [isPending, startTransition] = useTransition();
    const formData = new FormData();
    formData.append("product", "test");
    formData.append("price", "10");
  return (
    <button onClick={() => startTransition(() => addProductsToDataBase(formData))} disabled={isPending ? true : false} className="bg-blue-500 text-white px-4 py-2 rounded-md fixed bottom-10 right-10">
      {isPending ? "Adding..." : "Add Test Product"}
    </button>
  )
}

export default AddProductButton