
import { create } from 'zustand'
import toast from 'react-hot-toast';
import Axios from '@/configs/axiosConfig';
import { TLogin, TRegister, TUpdateUser } from '@/constants/types';
import { API } from '@/routes/apis';

const toastError = (err: string) => toast.error(err || 'Some Error!');
const toastSuccess = (msg: string) => toast.success(msg || 'Some Success!');

export const useAuthStore = create((
  set: any, 
  //get:any
) => ({
  authUser: null,
  loadAuthUser: true,

  loading: false,
  loadLogout: false,

  // /user
  getAuthAct: async () => {
    set((s:any) => ({...s, loadAuthUser: true}));
    try {

      const promise = Axios.get(
        API.getGetAuth,
      );

      const response = await promise;
      console.log('register: ', response);
      const data = response?.data;
      if (!data) return false;

      set((s:any) => ({
        ...s, 
        authUser: data.user,
      }))
      set((s:any) => ({...s, loadAuthUser: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      //toastError('Register Failed!');
      set((s:any) => ({...s, loadAuthUser: false}));
      return false;
    }
  },
 
  registerAct: async (payload: TRegister) => {
    set((s:any) => ({...s, loading: true}));
    try {
      // store email in localStorage
      localStorage.setItem('email', JSON.stringify(payload.email));

      const promise = Axios.post(
        API.postRegister,
        payload,
      );

      const response = await promise;
      console.log('register: ', response);
      const data = response?.data;
      if (!data) return false;

      toastSuccess('Register Success!');
      set((s:any) => ({...s, loading: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      toastError('Register Failed!');
      set((s:any) => ({...s, loading: false}));
      return false;
    }
  },

  loginAct: async (payload: TLogin) => {
    set((s:any) => ({...s, loading: true}));
    try {

      const promise = Axios.post(
        API.postLogin,
        payload,
      );

      const response = await promise;
      console.log('login: ', response);
      const data = response?.data;
      if (!data) return false;

      toastSuccess('Login Success!');
      set((s:any) => ({...s, loading: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      toastError('Login Failed!');
      set((s:any) => ({...s, loading: false}));
      return false;
    }
  },

  logoutAct: async () => {
    set((s:any) => ({...s, loadLogout: true}));
    try {

      const promise = Axios.get(
        API.getLogout,
      );

      toast.promise(promise, {
        loading: "Waiting to logout...",
        error: "Logout error!",
        success: 'Logout success!'
      });

      const response = await promise;
      console.log('Logout: ', response);
      const data = response?.data;
      if (!data) return false;

      set((s:any) => ({
        ...s,
        authUser: null,
      }))

      //toastSuccess('Logout Success!');
      set((s:any) => ({...s, loadLogout: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      //toastError('Logout Failed!');
      set((s:any) => ({...s, loadLogout: false}));
      return false;
    }
  },

  editProfileAct: async (payload: TUpdateUser) => {
    set((s:any) => ({...s, loading: true}));
    try {

      const promise = Axios.put(
        API.putUpdateUser,
        payload,
        {
          headers: {
            'content-type': 'multipart/form-data',
          }
        }
      );

      const response = await promise;
      console.log('login: ', response);
      const data = response?.data;
      if (!data) return false;

      toastSuccess('Update Profile Success!');
      set((s:any) => ({...s, loading: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      toastError('Update Profile Failed!');
      set((s:any) => ({...s, loading: false}));
      return false;
    }
  },
}));

//@ts-ignore
const unsub = useAuthStore.subscribe((state:any) => {
  console.log('useAuthStore:', state);
});