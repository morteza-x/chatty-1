import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "..";
import { useBaseModal } from "@/providers/BaseModalProvider";

export function useEditProfile() {
  const fileRef = useRef(null);
  const [formInput, setFormInput] = useState({
    username: '',
    file: null,
  });

  const [errors, setErrors] = useState({
    username: [],
    file: [],
  });

  const {
    loading,
    editProfileAct,
    getAuthAct,
  } = useAuthStore();
  const {onClose} = useBaseModal();

  const validate = () => {
    const errors:any = {
      username: [],
      file: [],
    };

    if (!formInput.username) {
      errors.username.push('username is required.');
    }
    if (!formInput.file) {
      errors.file.push('Image is required.');
    }

    setErrors(errors);
  }

  const handInputChange = (e: any) => {
    const value = e.target?.value;
    const name = e.target.name;
    let file:any;
    if (e.target?.files) file = e.target.files[0];

    switch(name) {
      case 'username':
        setFormInput((c:any) => ({...c, username: value}));
        break;
      case 'file':
        setFormInput((c:any) => ({...c, file: file}));
        break;
      
      default:
        break;
    }
  }

  const handSubmit = async (e:any) => {
    e.preventDefault();

    validate();

    if (
      errors.username.length ||
      errors.file.length

    ) return;
    
    // submit
    
    //console.log(formInput);

    const res = await editProfileAct(formInput);
    
    if (res) {
      setFormInput({
        username: '',
        file: null,
      });
      //@ts-ignore
      fileRef.current.value = '';
      onClose();

      await getAuthAct();
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
    fileRef,
  };
}