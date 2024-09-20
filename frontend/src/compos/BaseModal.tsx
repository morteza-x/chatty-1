import { useBaseModal } from '@/providers/BaseModalProvider';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  //ModalFooter,
  ModalBody,
  ModalCloseButton,
  //Button,
} from '@chakra-ui/react'

export function BaseModal() {
  const {
    isOpen, 
    //onOpen, 
    onClose,
    child,
    data,
  } = useBaseModal();

  return (
    <>
      <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isCentered={true}
      scrollBehavior='inside'
      size={data?.size || 'md'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='border-b-2'>
            {data?.title || ''}
          </ModalHeader>
          <ModalCloseButton className='mt-2'/>
          <ModalBody className={`${data?.bgColor}`}>
          {child}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}