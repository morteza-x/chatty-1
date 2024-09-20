import { Button, Checkbox, FormControl,
  //FormHelperText, 
  FormLabel, Image, Input, Text } from "@chakra-ui/react"
import { 
  Card, 
  //CardHeader, 
  CardBody, 
  //CardFooter 
} from '@chakra-ui/react'
import { useRegister } from "../hooks/useRegister"
import { helper } from "@/utils/helper";

export const RegisterForm = () => {
  const {
    formInput,
    errors,
    handInputChange,
    handSubmit,
    loading,
  } = useRegister();

  return (
    <Card
    className="
    mx-auto
    max-w-[400px]
    "
    >
      <CardBody className="flex flex-col gap-4">
        <Text
        className="
        text-xl font-semibold underline
        "
        >
          Register here
        </Text>
        <Image
        src={'/notion-parade.png'}
        />
        <form
        className="flex flex-col gap-4"
        onSubmit={handSubmit}
        >
          <FormControl 
          isInvalid={!!(errors.email.length)}
          >
            <FormLabel>
            Email
            </FormLabel>
            <Input 
            type='email' 
            name="email"
            value={formInput.email} 
            onChange={handInputChange} 
            />
            
            <div className="flex flex-col gap-2 mt-1">
              {
                errors.email.length
                ?(
                  errors.email.map((err:any) => (
                    <div 
                    key={helper.getRandomId()}
                    className="text-sm font-semibold text-red-400">
                      {err}
                    </div>
                  ))
                ):''
              }
            </div>
            
          </FormControl>

          <FormControl 
          isInvalid={!!(errors.accept.length)}
          >
            <div>
            <Checkbox 
            name="accept"
            onChange={handInputChange}
            >
            Accept our terms of service.
            </Checkbox>
            
            </div>
            
            <div className="flex flex-col gap-2 mt-1">
              {
                errors.accept.length
                ?(
                  errors.accept.map((err:any) => (
                    <div 
                    key={helper.getRandomId()}
                    className="text-sm font-semibold text-red-400">
                      {err}
                    </div>
                  ))
                ):''
              }
            </div>
          </FormControl>

          <Button
          className="self-center"
          colorScheme="twitter"
          type={'submit'}
          isLoading={loading}
          isDisabled={!!(errors.email.length) || !!(errors.accept.length)}
          >
            REGISTER!
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
