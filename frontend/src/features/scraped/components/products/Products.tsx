import { usePanelStore } from "@/features/dashboard/stores/panelStore"
import { useOnce } from "@/hooks/useOnce";
import { ProductCard } from "./ProductCard";
import { helper } from "@/utils/helper";
import { NoRes } from "@/compos/NoRes";
import { IconButton, Skeleton } from "@chakra-ui/react";
import { HiOutlineRefresh } from "react-icons/hi";

export const Products = () => {
  const {
    //fetchScrapedDataAct,
    //scrapedData,
    //loadScrapedData,
    fetchCryptoPriceAct,
    cryptoPrices,
    loadCryptoPrices,
    //fetchCryptoHistoryAct,
    //cryptoHistory,
  } = usePanelStore();

  useOnce(async () => {
    //await fetchScrapedDataAct();
    await fetchCryptoPriceAct();
    //@ts-ignore
  });

  return (
    
    <section className="
    hidden
    #flex-1
    md:block #flex-col #gap-4">
      <header className="flex items-center h-[50px] justify-between">
        <h2
        className="pb-1 text-lg font-semibold underline"
        >
          Countries
        </h2>
        <IconButton
        aria-label=""
        className="!border-2 !border-slate-200 anime-btn"
        isRound={true}
        size={'sm'}
        icon={<HiOutlineRefresh size={20}/>}
        colorScheme="purple"
        onClick={async () => {
          await fetchCryptoPriceAct();
        }}
        isLoading={loadCryptoPrices}
        >
        </IconButton>
      </header>

      <div
      className="
      flex flex-col gap-4
      "
      >
        {(() => {
          if (!loadCryptoPrices && !cryptoPrices.length) return <NoRes/>

          else if (loadCryptoPrices && !cryptoPrices.length) {
            return Array.from({length: 8}).map(() => (
              <Skeleton 
              key={helper.getRandomId()}
              className="!rounded-lg"
              isLoaded={!loadCryptoPrices}
              >
                <div className="w-full h-[75px]"></div>
              </Skeleton>
            ))
          }
          else {
            return cryptoPrices.length
            ?(
              cryptoPrices.map((el:any) => (
                <ProductCard
                key={helper.getRandomId()}
                item={el}
                />
              ))
            ):''
          }
          
        })()}

        
      </div>
    </section>
  )
}
