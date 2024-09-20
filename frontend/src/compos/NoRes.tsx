import { NoResIco } from "@/icons/NoResIco"

export const NoRes = () => {
  return (
    <div className="flex flex-col gap-3 items-center card-1 p-">
      <div className="flex items-center justify-between text-center max-w-20 w-full !fill-gray-400">
      <NoResIco/>
      </div>
      <h2 className="font-semibold">
        No items at the moment.
      </h2>
    </div>
  )
}
