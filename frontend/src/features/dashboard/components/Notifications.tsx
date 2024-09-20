import { NoRes } from "@/compos/NoRes"
import { Avatar, Button, Skeleton, Spinner } from "@chakra-ui/react"
import { HiOutlineEye } from "react-icons/hi2"
import { usePanelStore } from "../stores/panelStore"
import { useOnce } from "@/hooks/useOnce"
import { helper } from "@/utils/helper"
//import io from 'socket.io-client'

export const Notifications = () => {
  const {
    notifications,
    loadNotifications,
    fetchNotificationsAct,
  } = usePanelStore();

  useOnce(async () => {
    await fetchNotificationsAct();
  });

  if (loadNotifications) return <Spinner size={'lg'} color="purple"/>
 
  if (!notifications.length) return <NoRes/>

  return (
    <div
    className="
    flex flex-col gap-4
    bg-slate-100"
    >
      {
        notifications.length
        ?(
          notifications.map((el:any) => (
            <NCard
            key={el.id + helper.getRandomId()}
            item={el}
            />
          ))
        ):''
      }
    </div>
  )
}

const NCard = ({item}:any) => {
  const {
    loadNotifications,
    fetchNotificationsAct,
    setReadNotificationAct,
    loading,
  } = usePanelStore();

  return(
    <Skeleton 
    className="!rounded-lg"
    isLoaded={!loadNotifications}
    >
      <div
      className="
      flex flex-col gap-3
      border-2 border-slate-200 bg-white 
      rounded-md p-3
      "
      >
        <div className="flex items-center gap-2">
          <Avatar
          src={item.sender.image}
          />
          <div className="flex items-center gap-2 text-gray-500">
            <span>
              {item.sender.username}
            </span>
            .
            <span >
              {item.createdAt}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 justify-between">
          <p
          className="flex-1"
          >
            {item.message}
          </p>
          <Button
          className="!rounded-[9999px] border-slate-200 anime-btn"
          variant={'solid'}
          size={'sm'}
          leftIcon={<HiOutlineEye size={24}/>}
          colorScheme={!item.isRead ? 'purple' : 'gray'}

          onClick={async () => {
            if (item.isRead) return;
            await setReadNotificationAct({notificationId: item._id});
            await fetchNotificationsAct();
          }}

          isLoading={loading}
          >
            {item.isRead ? 'SEEN!' : 'UNSEEN!'}
          </Button>
        </div>
      </div>
    </Skeleton>
  )
}