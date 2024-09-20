import { usePanelStore } from "@/features/dashboard/stores/panelStore"
import { Avatar, IconButton, Skeleton } from "@chakra-ui/react"
import { HiOutlineBookmark } from "react-icons/hi2"

export const ProductCard = ({item}:any) => {

  const {
    createBookmarkAct,
    loading,
    fetchBookmarksAct,

    loadCryptoPrices,

    //fetchCryptoHistoryAct,
    //loadCryptoHistory,
    //loadHistoryHand,

  } = usePanelStore();

  return (
    <Skeleton
    isLoaded={!loadCryptoPrices}
    >
      <div
      className="
      card-1 flex items-center gap-2 justify-between
      "
      >
        <div className="flex items-center gap-2">
          <div>
            <Avatar 
            //className="w-[40px]"
            src={item.flags.svg}
            />

          </div>

          <div className="flex flex-col ">
            <span className="text-gray-500">
              {item.name.common}
            </span>
            {/* <span className="font-semibold">
              {helper.formatCurrencyUsd(item.usdPrice)}
            </span> */}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* <IconButton
          className="!border-2 !border-slate-200"
          aria-label=""
          isRound={true}
          size={'sm'}
          icon={<HiMiniArrowTrendingUp size={20}/>}
          onClick={async () => {
            // set crypto history
            await fetchCryptoHistoryAct({address: item.tokenAddress});
          }}

          isLoading={loadHistoryHand}
          >
          </IconButton> */}
          <IconButton
          className="!border-2 !border-slate-200 anime-btn !overflow-auto"
          aria-label=""
          isRound={true}
          size={'sm'}
          icon={<HiOutlineBookmark size={24}/>}
          onClick={async () => {
            const obj = {
              tokenLogo: item.flags.svg,
              tokenName: item.name.common,
            };

            await createBookmarkAct({jsonData: obj});

            // fetch bookmarks
            await fetchBookmarksAct();
          }}

          isLoading={loading}
          >
          </IconButton>
        </div>
        
      </div>
    </Skeleton>
  )
}
