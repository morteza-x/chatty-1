//import { useOnce } from "@/hooks/useOnce";
import { useEffect, useState } from "react";
import { useAuthStore } from "..";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/const";
//import { useAuthStore } from "@/features/auth";
//import { helper } from "@/utils/helper";

export function useLogin() {
  const [formInput, setFormInput] = useState({
    otp: '',
  });

  const [errors, setErrors] = useState({
    otp: [],
  });

  const {
    loading,
    loginAct,
  } = useAuthStore();
  const navigate = useNavigate();

  const validate = () => {
    const errors:any = {
      otp: [],
    };

    if (!formInput.otp) {
      errors.otp.push('otp is required.');
    }

    setErrors(errors);
  }

  const handInputChange = (e: any) => {
    const value = e.target?.value;
    const name = e.target.name;

    switch(name) {
      case 'otp':
        setFormInput((c:any) => ({...c, otp: value}));
        break;
      
      default:
        break;
    }
  }

  const handSubmit = async (e:any) => {
    e.preventDefault();

    validate();

    // get email from storage
    const EMAIL = localStorage.getItem('email');
    if (!EMAIL) return;
    const email = JSON.parse(EMAIL);

    if (
      errors.otp.length

    ) return;
    
    // submit
    const payload = {
      otp: formInput.otp,
      email,
    };

    //console.log(payload);

    const res = await loginAct(payload);
    
    if (res) {
      setFormInput({
        otp: '',
      });

      navigate(ROUTES.dashboard().link);
    }
  }

  useEffect(() => {
    validate();
  }, [formInput]);

  return {
    formInput,
    setFormInput,
    handSubmit,
    errors,
    handInputChange,
    loading,
  };
}