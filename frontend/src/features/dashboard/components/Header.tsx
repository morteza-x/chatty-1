import { useBaseModal } from "@/providers/BaseModalProvider";
import {  Avatar, Button, IconButton,  } from "@chakra-ui/react"
import {  FaRedditSquare } from "react-icons/fa";
import { 

   HiOutlineBell,
   //HiOutlineUser,
   } from "react-icons/hi2"
import { Link,  } from "react-router-dom";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Notifications } from "./Notifications";
import { EditProfile, useAuthStore } from "@/features/auth";
import { ROUTES } from "@/constants/const";
import { helper } from "@/utils/helper";
import { usePanelStore } from "../stores/panelStore";
import { useOnce } from "@/hooks/useOnce";

export const Header = () => {
  const {modalOn} = useBaseModal();
  const {width} = useScreenSize();
  const {
    authUser, 
  }:any = useAuthStore();
  
  const {
    fetchNotificationsAct,
    hasNotifications,
  } = usePanelStore();

  useOnce(async () => {
    await fetchNotificationsAct();
  });

  return (
    <header
    className="
    h-[60px] py-4 flex items-center bg-white
    #flex-auto #shadow-md sticky top-0 z-10 border-b border-slate-300
    "
    >
      <div
      className="
      flex items-center justify-between
      #container flex-1 px-3
      #mx-auto 
      "
      >
        <Link
        to={ROUTES.dashboard().link}
        className="
        font-bold text-violet-500
        "
        >
          <FaRedditSquare size={34}/>
        </Link>

        <div
        className="flex items-center gap-4"
        >

          
          <div
          className="
          relative
          "
          >
            <IconButton
            className="!border-2 anime-btn"
            aria-label=""
            isRound={true}
            icon={<HiOutlineBell size={20}/>}
            //colorScheme="red"
            variant={'outline'}
            size={'sm'}
            onClick={() => modalOn(
              <Notifications />,
              {
                title: 'Your notifications!',
                size: width < 640 ? 'full' : "",
                bgColor: '!bg-slate-100'
              }
            )}
            />

            <div className="
            absolute -top-0 -right-0
            bg-red-500 w-[10px] h-[10px] rounded-full"
            style={{display: hasNotifications ? 'block' : 'none'}}
            >
              
            </div>
          </div>

          

          <Button
          className="!border-2 cursor-pointer !border-slate-200 hover:!border-slate-30 !overflow-hidden !rounded-[9999px] !flex !items-center !justify-between !gap-3 !p-2
          anime-btn
          "
          aria-label=""
          onClick={() => modalOn(
            <EditProfile/>,
            {title: 'Edit profile!', size: width < 640 ? 'full' : ""}
          )}
          >
            <Avatar
            className="
            #w-[34px] rounded-[9999px]
            0"
            src={authUser?.image}
            size={'sm'}
            
            />
            <span>
              {helper.truncateText(authUser?.username, 10)}
            </span>
          </Button>
          
        </div>
      </div>
    </header>
  )
}
