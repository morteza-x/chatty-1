import { Bookmarked, Products } from "@/features/scraped"
import { Feed } from "./Feed"
import { useState } from "react"
import { UserPosts } from "./UserPosts";

export const DashboardView = () => {
  const [feedState, setFeedState] = useState<'feed' | 'user'>('feed');
  
  return (
    <div
    className="
    h-full bg-slate-100 flex-1 p-3
    relative
    "
    >
      <div
      className="
      grid gap-4 h-full
      grid-cols-1
      md:grid-col-fr-1-2-1
      max-w-[1250px] mx-auto
      "
      >
        <Products/>
        {feedState === 'feed' 
        ? <Feed setFeedState={setFeedState} /> 
        : <UserPosts setFeedState={setFeedState}/>}
        <Bookmarked/>
      </div>
    </div>
  )
}
