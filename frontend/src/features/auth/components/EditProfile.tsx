import { helper } from "@/utils/helper"
import { Avatar, Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { FaPhotoVideo, FaStarOfLife } from "react-icons/fa"
import { useEditProfile } from "../hooks/useEditProfile"
import { useAuthStore } from "../stores/authStore"
import { LogoutBtn } from "./LogoutBtn"

export const EditProfile = () => {
  const {
    formInput,
    errors,
    handInputChange,
    handSubmit,
    loading,
    fileRef,
  } = useEditProfile();
  const {authUser}:any = useAuthStore();

  return (
    <form 
    className="flex flex-col gap-4"
    onSubmit={handSubmit}
    >
      <div className="flex items-center gap-4 border-b py-2 #font-bold">
        <span>
        Logout:
        </span>
        <LogoutBtn/>
      </div>

      <h2 className="underline">
        Edit your profile here
      </h2>
      <FormControl>
        <FormLabel>
          <div className="flex items-center gap-2">
            <span>
              Username
            </span>
            <span className="text-red-500">
            <FaStarOfLife size={12}/>
            </span>
          </div>
        </FormLabel>

        <Input
        name="username"
        placeholder="Enter a username"
        variant={'flushed'}
        value={formInput.username}
        onChange={handInputChange}
        />
        
        <div>
          {
            errors.username.length
            ?(
              errors.username.map((el:any) => (
                <span 
                className="text-red-500"
                key={helper.getRandomId()}>
                  {el}
                </span>
              ))
            ):''
          }
        </div>
      </FormControl>
      
      <FormControl 
      className="flex flex-col gap-3"
      >
        
        <div className="flex items-center gap-2 font-semibold">
          <span>
            Avatar
          </span>
          <span className="text-red-500">
          <FaStarOfLife size={12}/>
          </span>
        </div>
        

        <div className="flex items-center gap-3">
          <Avatar 
          src={authUser?.image}
          borderRadius={'md'}/>
          <label
          className="
          grid place-content-center
          border-2 flex-1 p-3 rounded-lg border-dashed
          !h-full cursor-pointer text-center
          hover:bg-slate-100 transition-all
          "
          htmlFor="file"
          >
            <span className="grid place-content-center text-gray-400">
            <FaPhotoVideo size={38}/>
            </span>
            <p>
              Upload a new avatar!
            </p>
          </label>
          <Input
          id="file"
          className="hidden "
          name="file"
          placeholder="Enter a file"
          variant={'flushed'}
          type="file"
          //value={formInput.file}
          onChange={handInputChange}
          ref={fileRef}
          />
        </div>
        <div>
          {
            errors.file.length
            ?(
              errors.file.map((el:any) => (
                <span 
                className="text-red-500"
                key={helper.getRandomId()}>
                  {el}
                </span>
              ))
            ):''
          }
        </div>
      </FormControl>
      
      <Button
      className="
      !border-2 border-slate-200 !rounded-[9999px] anime-btn
      "
      type="submit"
      isDisabled={!!(errors.username.length) || !!(errors.file.length)}
      isLoading={loading}
      >
        UPLOAD!
      </Button>
    </form>
  )
}