import { PostsFeed } from './PostsFeed'
import { Button } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

export const Feed = ({
  setFeedState
}:any) => {

  return (
    <section className="flex flex-col #gap-4">

      <div className="flex items-center gap-2 justify-between h-[50px]">
        <h2 className="font-semibold underline">
          what people are saying!
        </h2>
        <Button
        className="!rounded-[9999px] #border-2 #border-slate-200 anime-btn"
        colorScheme="purple"
        //variant={'outline'}
        leftIcon={<Plus size={20}/>}
        size={'sm'}
        onClick={() => {
          setFeedState('user');
        }}
        >
          POST!
        </Button>
      </div>
      <PostsFeed/>
    </section>
  )
}
