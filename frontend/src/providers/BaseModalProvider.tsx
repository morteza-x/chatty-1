import { useDisclosure } from "@chakra-ui/react";
import { ReactNode, createContext, useContext, useState } from "react";

const BaseModalContext = createContext<any>({});

export const useBaseModal = () => {
  const {
    isOpen,
    onOpen,
    onClose,
    modalOn,
    child,
    data,

  } = useContext(BaseModalContext);

  return {
    isOpen,
    onOpen,
    onClose,
    modalOn,
    child,
    data,

  };
};

export const BaseModalProvider = ({
  children,
}: {
  children: ReactNode,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [child, setChild] = useState(<></>); 
  const [data, setData] = useState(null);
  const modalOn = (child:any, data:any) => {
    onOpen();
    setChild(child);
    setData(data);
  }

  const context = {
    isOpen,
    onOpen,
    onClose,
    modalOn,
    child,
    data,
  };

  return (
    <BaseModalContext.Provider value={context}>
      {children}
    </BaseModalContext.Provider>
  )
}