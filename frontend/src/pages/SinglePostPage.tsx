import { usePanelStore } from "@/features/dashboard/stores/panelStore";
import { useOnce } from "@/hooks/useOnce";
import { Image, Skeleton } from "@chakra-ui/react"
import {  useParams } from "react-router"

export const SinglePostPage = () => {
  const {id} = useParams();
  //const navigate = useNavigate();
  const {
    fetchPostAct, 
    post,
    loadPost,
  }:any = usePanelStore();

  // get a post
  useOnce(async () => {
    if (!id) return;
    const payload = {postId: id};
    await fetchPostAct(payload);
  });

  return (
    <div
    className="
    h-full bg-slate-100 flex-1 p-3
    min-h-[100vh]
    "
    >
      <section className="flex flex-col gap-4 max-w-[600px] mx-auto">

        <div className=" bg-white rounded-sm p-4 border-2 border-slate-200">

          <Skeleton
          className="!rounded-lg"
          isLoaded={!loadPost}
          >
            <div
            className="rounded-md overflow-hidden mb-4 min-h-[300px]"
            >
            <Image src={post?.image}/>
            </div>
          </Skeleton>

          <Skeleton
          className="!rounded-lg"
          isLoaded={!loadPost}
          >
            <p className="min-h-[100px]">
              {post?.text}
            </p>
          </Skeleton>
        </div>
      </section>
    </div>
  )
}
