import { Button, FormControl, 
  //FormErrorMessage, 
  //FormHelperText, 
  FormLabel, Image, Input, Text } from "@chakra-ui/react"
import { 
  Card, 
  //CardHeader, 
  CardBody, 
  //CardFooter 
} from '@chakra-ui/react'
import { helper } from "@/utils/helper";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const {
    formInput,
    errors,
    handInputChange,
    handSubmit,
    loading,
  } = useLogin();

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
          Login here
        </Text>
        <Image
        src={'/product-hero-v2.png'}
        />

        <p
        className="text-gray-500 font-semibold text-center max-w-[300px] self-center"
        >
          We have sent a code to your email! Enter it here to login.
        </p>

        <form
        className="flex flex-col gap-4"
        onSubmit={handSubmit}
        >
          <FormControl 
          isInvalid={!!(errors.otp.length)}
          >
            <FormLabel>
            Otp
            </FormLabel>
            <Input 
            type='text' 
            name="otp"
            value={formInput.otp} 
            onChange={handInputChange} 
            />
            
            <div className="flex flex-col gap-2 mt-1">
              {
                errors.otp.length
                ?(
                  errors.otp.map((err:any) => (
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
          isDisabled={!!(errors.otp.length)}
          >
            LOGIN!
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
