import { helper } from "@/utils/helper"
import { Avatar, Button, Image, Skeleton } from "@chakra-ui/react"
import { Link, useSearchParams } from "react-router-dom"
import { TbArrowBigDown, TbArrowBigUp,  } from "react-icons/tb";
import { ROUTES } from "@/constants/const";
import { usePanelStore } from "../stores/panelStore";

export const PostCard = ({item, }:any) => {
  const {
    voteAct,
    loading,
    fetchPostsAct,
  } = usePanelStore();
  const [searchParams] = useSearchParams();
  const limit:number = Number(searchParams.get('limit'));
  const page:number = Number(searchParams.get('page'));
  const {loadPosts} = usePanelStore();

  return (
    <Skeleton isLoaded={!loadPosts}>
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
              {item.createdAt}
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
          <Button
          className={`
            ${item.voted ? '!border-violet-400' : '!border-2'}
            anime-btn
          !rounded-[9999px] !border-2  
          `}
          colorScheme={item.voted ? 'purple' : 'gray'}
          variant={'solid'}
          leftIcon={<TbArrowBigDown />}
          rightIcon={<TbArrowBigUp />}
          size={'sm'}
          isLoading={loading}
          onClick={async () => {
            //console.log(item.voted, item._id);
            //return
            const payload = {
              postId: item._id,
              vote: item.voted ? '-1' : '1'
            }
            await voteAct(payload);
            // @ts-ignore
            await fetchPostsAct({limit, page});
          }}
          >
            {item.upVotes ? item.upVotes : 'Vote'}
          </Button>

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
