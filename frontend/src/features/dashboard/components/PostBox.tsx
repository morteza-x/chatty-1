import { Button, FormControl, Input, Text, Textarea } from "@chakra-ui/react"
import { HiPhotograph } from "react-icons/hi";
import { useCreatePost } from "../hooks/useCreatePost";
import { helper } from "@/utils/helper";
import { FaRegMessage } from "react-icons/fa6";
import { useRef } from "react";

export const PostBox = () => {
  const {
    //formInput,
    errors,
    handSubmit,
    handInputChange,
    loading,
    textRef,
  } = useCreatePost();
  const labelRef = useRef(null);

  return (
    <form 
    className="flex flex-col gap-4 card-1 mb-4"
    onSubmit={handSubmit}
    >
      <div className="!m-0 !py-0 !pt-4">
        <Text className="font-semibold underline !m-0 ">
          What are you thinking son?
        </Text>
      </div>
      <div
      className="flex gap-3"
      >
        {/* <Image 
        className="rounded-md w-[60px] h-[60px] "
        src={faker.image.avatar()}/> */}
        <FormControl>
          <Textarea
          ref={textRef}
          className=""
          name="text"
          rows={3}
          placeholder="Enter your post here..."
          variant={'flushed'}
          onChange={handInputChange}
          />
          <div>
            {
              errors.text.length
              ?(
                errors.text.map((el:any) => (
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
      </div>

      <div
      className="
      flex #flex-col #items-center #justify-between #border-t gap-4 pt-2
      "
      >
        <div className="flex items-center ">
          <label 
          className="!block w-full"
          htmlFor="file"
          
          ref={labelRef}
          >
            <Button
            className="flex-1 !rounded-[9999px] border-2 w-full"
            leftIcon={<HiPhotograph size={20}/>}
            size={'sm'}
            // @ts-ignore
            onClick={() => labelRef.current.click()}            
            >
              PHOTO
            </Button>
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
          </label>
          <Input 
          id="file"
          className="!hidden"
          type="file"
          name="file"
          //value={formInput.text}
          onChange={handInputChange}
          />
        </div>
        <Button
        className="#flex-1 !rounded-[9999px] border-2"
        //variant={'outline'}
        //colorScheme="red"
        size={'sm'}
        type="submit"
        isLoading={loading}
        isDisabled={!!(errors.text.length) || !!(errors.file.length)}
        leftIcon={<FaRegMessage size={20}/>}
        >
          SEND!
        </Button>
      </div>
    </form>
  )
}
