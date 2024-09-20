import { usePanelStore } from "@/features/dashboard/stores/panelStore"
import { helper } from "@/utils/helper"
import { Avatar, IconButton, Skeleton } from "@chakra-ui/react"
import { HiOutlineTrash } from "react-icons/hi2"

export const BookmarkCard = ({item}:any) => {
  const {
    fetchBookmarksAct,
    deleteBookmarkAct,
    loading,

    loadBookmarks,
  } = usePanelStore();

  return (
    <Skeleton
    className="!rounded-lg"
    isLoaded={!loadBookmarks}
    >
      <div
      className="
      card-1 flex items-center gap-2 font-semibold text-gray-500 justify-between
      "
      // dir="rtl"
      // style={{
      //   fontFamily: 'El Messiri'
      // }}
      >
        <Avatar src={item.jsonData.tokenLogo}/>

        <div>
          <p>
            {helper.truncateText(item.jsonData.tokenName, 50)}
          </p>
          {/* <span className="text-sm text-gray-400">
            {helper.formatCurrencyUsd(item.jsonData.usdPrice)}
          </span> */}
        </div>
        <IconButton
        className="!border-2 !border-slate-200 anime-btn"
        aria-label=""
        isRound={true}
        icon={<HiOutlineTrash size={24}/>}
        //colorScheme=""

        onClick={async () => {
          await deleteBookmarkAct({itemId: item._id})

          await fetchBookmarksAct();
        }}
        isLoading={loading}
        >
        </IconButton>
      </div>
    </Skeleton>
  )
}
