"use server"

import { Product } from "@/typings";
import { revalidateTag } from "next/cache";

export const addProductsToDataBase = async (e: FormData) => {
    const product = e.get('product')?.toString();
    const price = e.get('price')?.toString();

    if (!product || !price) return

    const newProduct: Product = {
      product,
      price
    }
    await fetch('https://64db99de593f57e435b13182.mockapi.io/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    revalidateTag('products')
  }
  export async function adjustLikes(amount: number) {
    if (!amount) return

    await fetch('http://localhost:3000/likes', {
      method: 'POST',
      cache: "no-cache",
      body: JSON.stringify({ amount }),
      headers: {
        'Content-Type': 'application/json'
      }
  })
  revalidateTag('likes');
}