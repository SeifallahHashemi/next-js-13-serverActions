import { addProductsToDataBase } from "@/actions/serverActions";
import AddProductButton from "@/components/AddProductButton";
import Counter from "@/components/Counter";
import OptimisticCounter from "@/components/OptimisticCounter";
import { Likes, Product } from "@/typings";

export const metadata = {
  title: 'Server Actions',
  description: 'How to use Next js 13 Server Actions',
  keyword: 'next.js, web development, javascript, css, html, react, next js 13'
}

export default async function Home() {
  const res = await fetch('https://64db99de593f57e435b13182.mockapi.io/products', {
    cache: 'no-cache',
    next: {
      tags: ['products']
    }
  });
  const products: Product[] = await res.json();

  const fetchRes = await fetch("http://localhost:3000/likes", {
    cache: 'no-cache',
    next: {
      tags: ['likes']
    }
  })
  const {likes}: Likes = await fetchRes.json();

  /* const addProductsToDataBase = async (e: FormData) => {
    "use server"
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
  } */
  return (
    <main>
      <h1 className="text-center">Product WareHouse</h1>
      <form action={addProductsToDataBase} className="flex flex-col gap-5 max-w-xl mx-auto p-5">
        <input name="product" className="border border-sky-400 rounded-md p-2 text-black"/>
        <input name="price" className="border border-sky-400 rounded-md p-2 text-black"/>
        <button type="submit" className="bg-green-400 text-white p-2 rounded-md border">Add Product</button>
      </form>
      <h2>List of Products</h2>
      <div className="flex flex-wrap gap-5">
        {products.map(product => (
          <div key={product.id} className="p-5 shadow">
            <p>{product.product}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <AddProductButton />
      <Counter likes={likes}/>
      <OptimisticCounter likes={likes}/>
    </main>
  )
}
