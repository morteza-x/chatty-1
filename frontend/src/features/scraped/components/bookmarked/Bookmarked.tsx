import { usePanelStore } from "@/features/dashboard/stores/panelStore"
import { useOnce } from "@/hooks/useOnce";
import { Skeleton } from "@chakra-ui/react";
import { BookmarkCard } from "./BookmarkCard";
import { NoRes } from "@/compos/NoRes";
import { Heading } from "@/compos/Heading";
import { helper } from "@/utils/helper";

export const Bookmarked = () => {

  const {
    bookmarks,
    loadBookmarks,
    fetchBookmarksAct,
  } = usePanelStore();

  useOnce(async() => {
    await fetchBookmarksAct();
  });

  //if (!loadBookmarks && !bookmarks.length) return <NoRes/>

  return (
    <div 
    className="
    hidden
    md:block
    sticky top-10 right-0
    "
    style={{
      alignSelf: 'start'
    }}
    >
      <Heading text={'Bookmarks'}/>

      <section className="
      hidden
      flex-1
      md:flex flex-col gap-4">
        
        <div
        className="
        flex flex-col gap-4
        "
        >
          {(() => {
            if (!loadBookmarks && !bookmarks.length) return <NoRes/>

            else if (loadBookmarks && !bookmarks.length) return Array.from({length: 5}).map(() => {
              return <Skeleton
              className="!rounded-lg "
              key={helper.getRandomId()}
              >
                <div className="w-full h-[75px]"></div>
              </Skeleton>
            })

            else {
              return bookmarks.map((el:any) => (
                <BookmarkCard
                key={el._id + helper.getRandomId()}
                item={el}
                />
              ))
            }
          })()}
          
        </div>
        
      </section>
    </div>
  )
}
