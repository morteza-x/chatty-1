import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router';
import { Button } from '@chakra-ui/react';
import { HiMiniPower } from 'react-icons/hi2';
import { ROUTES } from '@/constants/const';
import { useBaseModal } from '@/providers/BaseModalProvider';

export const LogoutBtn = (
  
) => {

  const {
    //authUser, 
    logoutAct,
    loadLogout,
    getAuthAct,
  }:any = useAuthStore();
  const navigate = useNavigate();
  const {onClose} = useBaseModal();

  return (
    <Button
    className="!border-2 !border-slate-200 !rounded-[9999px] anime-btn"
    aria-label=""
    colorScheme="red"
    variant={'solid'}
    size={'sm'}
    onClick={async () => {
      await logoutAct();
      onClose();
      await getAuthAct();
      navigate(ROUTES.register().link);

    }}
    isLoading={loadLogout}
    rightIcon={<HiMiniPower size={20}/>}
    >
      <span>
        Logout
      </span>
    </Button>
  )
}
