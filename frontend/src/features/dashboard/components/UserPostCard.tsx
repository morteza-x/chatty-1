import { helper } from "@/utils/helper"
import { Avatar, Image, Skeleton } from "@chakra-ui/react"
import { Link,  } from "react-router-dom"
import { ROUTES } from "@/constants/const";
import { usePanelStore } from "../stores/panelStore";

export const UserPostCard = ({item, }:any) => {
  const {loadUserPosts} =  usePanelStore();

  return (
    <Skeleton isLoaded={!loadUserPosts}>
      <div
      className="
      flex flex-col gap-3 rounded-lg
      bg-white p-3 border-2 border-gray-200
      "
      >
        <div
        className="flex items-center gap-2"
        >
          <Avatar 
          //className="w-[30px] h-[30px]"
          size={'sm'}
          src={item.user?.image || ''}/>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>
              {item.user?.username || ''}
            </span>
            .
            <span>
              {item.uiDate}
            </span>
          </div>
        </div>

        <section
        className="
        flex gap-2
        
        "
        >
          <div className="flex-[1.6]">
            <Link
            to={ROUTES.singlePost(item._id).link}
            className="hover:underline"
            target="_blank"
            >
              {helper.truncateText(item.text, 100)}
            </Link>
          </div>

          <Link
          to={ROUTES.singlePost(item._id).link}
          className="flex-1 rounded-md overflow-hidden"
          target="_blank"
          >
            <Image 
            className="rounded-md"
            src={item.image}
            />
          </Link>
        </section>

        <div className="flex items-center gap-2 justify-between">

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-2 p-1 px-2 rounded-[999px]
            border-slate-300 bg-slate-50
            ">
              <span className="font-bold">
                {item.upVotes}
              </span>
              <span className="
              hidden
              sm:block
              text-sm font-semibold text-gray-500">
                Up votes
              </span>
            </div>
            <div className="flex items-center gap-2 border-2 p-1 px-2 rounded-[999px]
            border-slate-300 bg-slate-50">
              <span className="font-bold">
                {item.downVotes}
              </span>
              <span 
              className="
              hidden
              sm:block
              text-sm font-semibold text-gray-500">
                Down votes
              </span>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  )
}
