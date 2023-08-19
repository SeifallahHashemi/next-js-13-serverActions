'use client'

import { adjustLikes } from "@/actions/serverActions"
import { Likes } from "@/typings"

function Counter({ likes }: Likes) {

  return (
    <div className="flex gap-2 border p-5 mb-2">
        <h2>Counter</h2>
        <button onClick={() => adjustLikes(-1)}>-</button>
        <p>{likes}</p>
        <button onClick={() => adjustLikes(+1)}>+</button>
    </div>
  )
}

export default Counter