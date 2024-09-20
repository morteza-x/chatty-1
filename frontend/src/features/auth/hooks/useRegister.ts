//import { useOnce } from "@/hooks/useOnce";
import { useEffect, useState } from "react";
import { useAuthStore } from "..";
import { isValidEmail } from "../utils/helper";
import { useNavigate } from "react-router";
//import { useAuthStore } from "@/features/auth";
//import { helper } from "@/utils/helper";

export function useRegister() {
  const [formInput, setFormInput] = useState({
    email: '',
    accept: false,
  });

  const [errors, setErrors] = useState({
    email: [],
    accept: [],
  });

  const {
    loading,
    registerAct,
  } = useAuthStore();

  const navigate = useNavigate();

  const validate = () => {
    const errors:any = {
      email: [],
      accept: [],
    };

    if (!formInput.email) {
      errors.email.push('Email is required.');
    }
    else if (!isValidEmail(formInput.email)) {
      errors.email.push("Enter a valid email!");
    }

    if (!formInput.accept) {
      errors.accept.push('Accept our terms!');
    }

    setErrors(errors);
  }

  const handInputChange = (e: any) => {
    const value = e.target?.value;
    const name = e.target.name;
    const checked = e.target.checked;

    switch(name) {
      case 'email':
        setFormInput((c:any) => ({...c, email: value}));
        break;
      
      case 'accept':
        setFormInput((c:any) => ({...c, accept: checked}));
        break;
      
      default:
        break;
    }
  }

  const handSubmit = async (e:any) => {
    e.preventDefault();

    validate();

    if (
      errors.email.length ||
      errors.accept.length

    ) return;
    
    // submit
    const payload = {
      email: formInput.email,
    };

    //console.log(payload);
    const res = await registerAct(payload);

    if (res) {
      setFormInput({
        email: '',
        accept: false,
      });

      // redirect to login
      navigate('/login');
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