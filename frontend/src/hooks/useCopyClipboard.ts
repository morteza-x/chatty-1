import { useState } from "react";
import toast from "react-hot-toast";

const toastSuccess = (msg:string) => toast.success(msg);
const toastError = (msg:string) => toast.error(msg);

export function useCopyClipboard() {
  const [copiedValue, setCopiedValue] = useState('');
  //const {modalOn} = useSiteStore();

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(copiedValue)
      .then(() => {
        toastSuccess("Copy to clipboard was successful!");
      })
      .catch(() => {
        toastError("Copy to clipboard was failed!");
      });
  }

  return {
    setCopiedValue,
    copyToClipBoard,
  }
}