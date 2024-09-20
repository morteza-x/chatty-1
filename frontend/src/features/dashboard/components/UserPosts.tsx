import { Button, Skeleton } from "@chakra-ui/react"
import { HiArrowLongLeft } from "react-icons/hi2"
import { usePanelStore } from "../stores/panelStore"
import { useOnce } from "@/hooks/useOnce";
import { UserPostCard } from "./UserPostCard";
import { helper } from "@/utils/helper";
import { NoRes } from "@/compos/NoRes";
import { PostBox } from "./PostBox";

export const UserPosts = ({
  setFeedState,
}:any) => {
  const {
    fetchUserPostsAct,
    userPosts,
    loadUserPosts,
    userPostsPag,
  } = usePanelStore();

  useOnce(async () => {
    const pag = {page: 1, limit: 5};
    const pagination = localStorage.getItem('pagination');

    if (!pagination) {
      localStorage.setItem('pagination', JSON.stringify(pag));
      await fetchUserPostsAct(pag);
    }
    else {
      const pagObj = JSON.parse(pagination);
      await fetchUserPostsAct(pagObj);
    }
  });
  //const userPosts = []

  return (
    <div className="flex flex-col #gap-3">
      <div className="flex items-center gap-2 justify-between h-[50px]">
        
        <Button
        className="!rounded-[9999px] !font-bold anime-btn"
        colorScheme="purple"
        variant={'ghost'}
        leftIcon={<HiArrowLongLeft size={24}/>}
        //size={'sm'}
        
        onClick={() => {setFeedState('feed')}}
        >
          BACK!
        </Button>
        <h2 className="font-semibold underline text-lg">
          Let out your ideas!
        </h2>
      </div>

      {/* post box */}
      <PostBox/>

      <div className="flex flex-col gap-4">

        {(() => {
          if (!loadUserPosts && !userPosts.length) return <NoRes/>

          else if (loadUserPosts && !userPosts.length) {
            return Array.from({length: 5}).map(() => {
              return <Skeleton
              key={helper.getRandomId()}
              className="!rounded-lg "
              >
                <div className="w-full h-[234px]"></div>
              </Skeleton>
            })
          }
          
          else {
            return userPosts.map((el:any) => (
              <UserPostCard
              key={el._id + helper.getRandomId()}
              item={el}
              />
            ))
          }

        })()}
      </div>

      <Button
      className="!rounded-[9999px] self-center anime-btn mt-4"
      //variant={'outline'}
      colorScheme="purple"

      onClick={async () => {
        const pagStr = localStorage.getItem('pagination');
        if (!pagStr) return;
        const pagObj = JSON.parse(pagStr);

        // next page
        pagObj.page += 1;
        // store back
        localStorage.setItem('pagination', JSON.stringify(pagObj));

        await fetchUserPostsAct(pagObj);
      }}
      //@ts-ignore
      isDisabled={loadUserPosts || !userPostsPag?.hasMore}
      isLoading={loadUserPosts}
      >
        MORE!
      </Button>
    </div>
  )
}
