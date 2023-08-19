"use client"
import { adjustLikes } from "@/actions/serverActions"
import { Likes } from "@/typings"
import { experimental_useOptimistic as useOptimistic} from "react"

const OptimisticCounter = ({ likes }: Likes) => {
    const [optimisticLikes, addOptimisticLikes] = useOptimistic(likes, (state, amount) => state + Number(amount))

    const updateLikes = async (amount: number) => {
        addOptimisticLikes(amount);
        await adjustLikes(amount);
    };
  return (
    <div className="flex gap-2 border p-5 mb-2">
        <h2>Optimistic Counter</h2>
        <button onClick={() => updateLikes(-1)}>-</button>
        <p>{optimisticLikes}</p>
        <button onClick={() => updateLikes(+1)}>+</button>
    </div>
  )
}

export default OptimisticCounter