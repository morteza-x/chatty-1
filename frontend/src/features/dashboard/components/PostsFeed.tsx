import { PostCard } from "./PostCard"
import { NoRes } from "@/compos/NoRes"
import { usePanelStore } from '../stores/panelStore'
import { useOnce } from '@/hooks/useOnce'
import { Button, Skeleton,  } from '@chakra-ui/react'
import { useSearchParams } from "react-router-dom"
import { LIMIT } from "@/constants/const"
import { helper } from "@/utils/helper"
//import { Heading } from "@/compos/Heading"

export const PostsFeed = () => {
  const {
    posts,
    postsPag,
    loadPosts,
    fetchPostsAct,
  } = usePanelStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  useOnce(() => {
    const limit:number = Number(searchParams.get('limit')) || 5;
    const page:number = Number(searchParams.get('page')) || 1;
    const fetchPosts = async () => {
      if (!limit || !page) return;
      const payload = {
        limit, page,
      }
      await fetchPostsAct(payload);
    }
    fetchPosts();
  });

  //if (loadPosts) return <Spinner size={'lg'} color='purple'/>

  if (!loadPosts && !posts.length) return <NoRes/>

  return (
    <section className="flex flex-col gap-4">
      <div
      className="
      #bg-white #border #border-slate-200 rounded-lg overflow-hidden
      flex flex-col gap-4
      "
      >
        {
          posts.length
          ?(
            posts.map((el:any) => (
              <PostCard
              key={el._id + helper.getRandomId()}
              item={el}
              />
            ))
          ):(
            Array.from({length: 5}).map(() => {
              return <Skeleton
              className="!rounded-lg "
              >
                <div className="w-full h-[234px]"></div>
              </Skeleton>
            })
          )
        }
      </div>
      
      <Button
      className="!rounded-[9999px] self-center anime-btn"
      //variant={'outline'}
      colorScheme="purple"

      onClick={async () => {
        let page:number = Number(searchParams.get('page')) || 1;
        //@ts-ignore
        setSearchParams({
          page: Number(page) + 1,
          limit: LIMIT,
        });

        const limit:number = Number(searchParams.get('limit')) || 5;
        // update page manually! cause setSearchParams is async
        page = page + 1;

        await fetchPostsAct({limit, page});
      }}
      //@ts-ignore
      isDisabled={loadPosts || !postsPag?.hasMore}
      isLoading={loadPosts}
      >
        MORE!
      </Button>
    </section>
  )
}

// const posts = Array.from({length: 6}).map(() => {
//   return {
//     id: helper.getRandomId(),
//     text: faker.lorem.words({min:200, max:1000}),
//     image: faker.image.urlLoremFlickr({category: 'pizza'}),
//     votes: faker.number.int({min: 0, max: 1000}), 
//     upVotes: faker.number.int({min: 0, max: 1000}),
//     downVotes: faker.number.int({min: 0, max: 1000}),
//     createdAt: moment(new Date()).format('MMM DD YYYY'),
//     user: {
//       image: faker.image.avatar(),
//       username: faker.person.firstName(),
//     }
//   }
// })