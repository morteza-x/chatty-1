import { useEffect, useRef, useState } from "react";
import { usePanelStore } from "../stores/panelStore";
import { useBaseModal } from "@/providers/BaseModalProvider";

export function useCreatePost() {
  const textRef = useRef(null);
  const [formInput, setFormInput] = useState({
    text: '',
    file: null,
  });

  const [errors, setErrors] = useState({
    text: [],
    file: [],
  });

  const {
    loading,
    createPostAct,
    fetchUserPostsAct,
  } = usePanelStore();
  const {onClose} = useBaseModal();  

  //const [searchParams, ] = useSearchParams();
  //const limit:number = Number(searchParams.get('limit')) || 5;
  //const page:number = Number(searchParams.get('page')) || 1;

  const validate = () => {
    const errors:any = {
      text: [],
      file: [],
    };

    if (!formInput.text) {
      errors.text.push('text is required.');
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
    if (e?.target?.files) file = e?.target?.files[0];

    switch(name) {
      case 'text':
        setFormInput((c:any) => ({...c, text: value}));
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
      errors.text.length ||
      errors.file.length

    ) return;
    
    // submit

    console.log(formInput);

    const res = await createPostAct(formInput);
    
    if (res) {
      setFormInput({
        text: '',
        file: null,
      });
      //@ts-ignore
      if (textRef?.current) textRef.current.value = '';
      onClose();
      //navigate('/');
      //await fetchPostsAct({limit, page});
      const paginate = {page: 1, limit: 5};
      const pag = localStorage.getItem('pagination');

      if (pag) {
        const pagObj = JSON.parse(pag);
        await fetchUserPostsAct(pagObj);
      }
      else {
        await fetchUserPostsAct(paginate);
      }
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
    textRef,
  };
}