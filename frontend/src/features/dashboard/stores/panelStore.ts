import { create } from 'zustand'
import toast from 'react-hot-toast';
import Axios from '@/configs/axiosConfig';
import { TBookmark, TCreatePost, TDeleteBookmark, TGetCryptoHistory, TGetPost, TGetPosts, TGetUserPosts, TNotificationRead, TVote,  } from '@/constants/types';
import { API } from '@/routes/apis';
import moment from 'moment';
import { useAuthStore } from '@/features/auth';

const toastError = (err: string) => toast.error(err || 'Some Error!');
const toastSuccess = (msg: string) => toast.success(msg || 'Some Success!');

export const usePanelStore = create((
  set: any, 
  get:any
) => ({
  posts: [],
  postsPag: null,
  loadPosts: true,

  post: null,
  loadPost: true,

  userPosts: [],
  loadUserPosts: true,
  userPostsPag: null,

  notifications: [],
  loadNotifications: true,
  hasNotifications: false,

  scrapedData: [],
  loadScrapedData: true,

  bookmarks: [],
  loadBookmarks: true,

  cryptoPrices: [],
  loadCryptoPrices: true,

  cryptoHistory: [],
  loadCryptoHistory: true,
  loadHistoryHand: false,

  loading: false,

  authStore: useAuthStore,

  // /posts
  fetchPostsAct: async (payload: TGetPosts) => {
    set((s:any) => ({...s, loadPosts: true}));
    try {
      console.log('--', payload)
      const promise = Axios.get(
        API.getFetchPosts + `?limit=${payload.limit}&page=${payload.page}`,
      );

      const response = await promise;
      console.log('fetch posts: ', response);
      const data = response?.data;
      if (!data) return false;

      // posts pagination obj
      const postsPag = {
        pages: data.pages,
        hasMore: data.hasMore,
      };

      const edited = data.results.map((el:any) => {
        const {createdAt, ...rest} = el;
        //const numberOfVotes = el.votes.length;
        const auth = get().authStore.getState().authUser;

        return {
          ...rest, 
          createdAt: moment(createdAt).format('MMM DD YYYY'),
          //numOfVotes: numberOfVotes,
          voted: rest.votes.some((el:any) => {
            return el.user === auth._id && el.vote.toString() === '1';
          }),
          numVotes: el.votes.length,
          downVotes: el.votes.filter((vote:any) => vote.vote.toString() === '-1').length,
          upVotes: el.votes.filter((vote:any) => vote.vote.toString() === '1').length,
        };
      }).sort((a:any, b:any) => b.upVotes - a.upVotes);
      
      // no duplicate
      const allPosts = get().posts;

      edited.forEach((newPost: any, ) => {
        const oldInx:number = allPosts.findIndex((obj:any) => obj._id === newPost._id);
        // if: post already exists =: replace with new one.
        if (oldInx !== -1) {
          allPosts[oldInx] = newPost;
        } 
        else {
          // push new post into the state
          allPosts.push(newPost);
        }
      });
      //console.log('after vote---------', allPosts);
      set((s:any) => ({
        ...s, 
        posts: allPosts.sort((a:any, b:any) => b.upVotes - a.upVotes),
        postsPag: postsPag,
      }))
      set((s:any) => ({...s, loadPosts: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      //toastError('Register Failed!');
      set((s:any) => ({...s, loadPosts: false}));
      return false;
    }
  },

  // /posts/user
  fetchUserPostsAct: async (payload: TGetUserPosts) => {
    set((s:any) => ({...s, loadUserPosts: true}));
    try {
      
      const promise = Axios.get(
        API.getGetUserPosts + `?limit=${payload.limit}&page=${payload.page}`,
      );

      const response = await promise;
      console.log('fetch user posts: ', response);
      const data = response?.data;
      if (!data) return false;

      // posts pagination obj
      const userPostsPag = {
        pages: data.pages,
        hasMore: data.hasMore,
      };

      const edited = data.results.map((el:any) => {
        //const {createdAt, ...rest} = el;
        //const numberOfVotes = el.votes.length;
        //const auth = get().authStore.getState().authUser;

        return {
          ...el, 
          uiDate: moment(el.createdAt).format('MMM DD YYYY'),
          
          numVotes: el.votes.length,
          downVotes: el.votes.filter((vote:any) => vote.vote.toString() === '-1').length,
          upVotes: el.votes.filter((vote:any) => vote.vote.toString() === '1').length,
        };
      })
      
      // no duplicate
      const allPosts = get().userPosts;

      edited.forEach((newPost: any, ) => {
        const oldInx:number = allPosts.findIndex((obj:any) => obj._id === newPost._id);
        // if: post already exists =: replace with new one.
        if (oldInx !== -1) {
          allPosts[oldInx] = newPost;
        } 
        else {
          // push new post into the state
          allPosts.push(newPost);
        }
      });

      // console.log(
      //   'after vote---------', 
      //   allPosts, 
      //   allPosts.sort((a:any, b:any) => a.createdAt - b.createdAt));

      set((s:any) => ({
        ...s, 
        //@ts-ignore
        userPosts: allPosts.sort((a:any, b:any) => new Date(b.createdAt) - new Date(a.createdAt)),
        userPostsPag: userPostsPag,
      }))
      set((s:any) => ({...s, loadUserPosts: false,}));
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      //toastError('Register Failed!');
      set((s:any) => ({...s, loadUserPosts: false}));
      return false;
    }
  },


  fetchPostAct: async (payload: TGetPost) => {
    set((s:any) => ({...s, loadPost: true}));
    try {
      
      const promise = Axios.get(
        API.getGetPost(payload.postId),
      );

      const response = await promise;
      console.log('fetch single post: ', response);
      const data = response?.data;
      if (!data) return false;

      set((s:any) => ({
        ...s, 
        post: data.results,
      }))
      set((s:any) => ({...s, loadPost: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      //toastError('Register Failed!');
      set((s:any) => ({...s, loadPost: false}));
      return false;
    }
  },
 
  createPostAct: async (payload: TCreatePost) => {
    set((s:any) => ({...s, loading: true}));
    try {

      const formData = new FormData();
      formData.append('text', payload.text);
      formData.append('file', payload.file || '');

      const promise = Axios.post(
        API.postCreatePosts,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          }
        }
      );

      const response = await promise;
      console.log('Create post: ', response);
      const data = response?.data;
      if (!data) return false;

      //await get().fetchPostsAct();

      toastSuccess('Create post Success!');
      set((s:any) => ({...s, loading: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      toastError('Create post Failed!');
      set((s:any) => ({...s, loading: false}));
      return false;
    }
  },

  fetchNotificationsAct: async () => {
    set((s:any) => ({...s, loadNotifications: true}));
    try {

      const promise = Axios.get(
        API.getNotifications,
      );

      const response = await promise;
      console.log('fetch notifications!: ', response);
      const data = response?.data;
      if (!data) return false;

      const edited = data.results.map((el:any) => {
        const obj = {
          ...el,
          createdAt: moment(el.createdAt).format('MMM DD YYYY'),
          sender: {...el.sender, createdAt: moment(el.sender.createdAt).format('MMM DD YYYY')}
        };

        return obj;
      });

      set((s:any) => ({
        ...s, 
        notifications: edited,
        hasNotifications: edited.some((notification:any) => !notification.isRead)
      }))

      set((s:any) => ({...s, loadNotifications: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      //toastError('Register Failed!');
      set((s:any) => ({...s, loadNotifications: false}));
      return false;
    }
  },

  voteAct: async (payload: TVote) => {
    set((s:any) => ({...s, loading: true}));
    try {

      const promise = Axios.post(
        API.postSendVote,
        payload,
      );

      const response = await promise;
      console.log('vote response: ', response);
      const data = response?.data;
      if (!data) return false;

      toastSuccess('vote Success!');
      set((s:any) => ({...s, loading: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      toastError('vote Failed!');
      set((s:any) => ({...s, loading: false}));
      return false;
    }
  },

  // set notification as seen
  setReadNotificationAct: async (payload: TNotificationRead) => {
    set((s:any) => ({...s, loading: true}));
    try {

      const promise = Axios.put(
        API.putSetNotificationRead,
        payload,
      );

      const response = await promise;
      console.log('set noti read response: ', response);
      const data = response?.data;
      if (!data) return false;

      toastSuccess('set noti read Success!');
      set((s:any) => ({...s, loading: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      toastError('set noti read Failed!');
      set((s:any) => ({...s, loading: false}));
      return false;
    }
  },

  // get craped data
  fetchScrapedDataAct: async () => {
    set((s:any) => ({...s, loadScrapedData: true}));
    try {
      
      const promise = Axios.get(
        API.getScraped,
      );

      const response = await promise;
      console.log('fetch posts: ', response);
      const data = response?.data;
      if (!data) return false;

      const edited = data.results.map((el:any) => {
        const {createdAt, ...rest} = el;

        return {
          ...rest, 
          createdAt: moment(createdAt).format('MMM DD YYYY'),
        };
      });

      set((s:any) => ({
        ...s, 
        scrapedData: edited,
      }))
      set((s:any) => ({...s, loadScrapedData: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      //toastError('Register Failed!');
      set((s:any) => ({...s, loadScrapedData: false}));
      return false;
    }
  },

  // get bookmarks
  fetchBookmarksAct: async () => {
    set((s:any) => ({...s, loadBookmarks: true}));
    try {
      
      const promise = Axios.get(
        API.getBookmarks,
      );

      const response = await promise;
      console.log('bookmarks: ', response);
      const data = response?.data;
      if (!data) return false;

      const edited = data.results.map((el:any) => {
        const {createdAt, ...rest} = el;

        return {
          ...rest, 
          createdAt: moment(createdAt).format('MMM DD YYYY'),
        };
      });

      set((s:any) => ({
        ...s, 
        bookmarks: edited,
      }))
      set((s:any) => ({...s, loadBookmarks: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      //toastError('Register Failed!');
      set((s:any) => ({...s, loadBookmarks: false}));
      return false;
    }
  },

  // create bookmarks
  createBookmarkAct: async (payload: TBookmark) => {
    set((s:any) => ({...s, loading: true}));
    try {

      const promise = Axios.post(
        API.postBookmarks,
        payload,
      );

      const response = await promise;
      console.log('Bookmark response: ', response);
      const data = response?.data;
      if (!data) return false;

      toastSuccess('Bookmark Success!');
      set((s:any) => ({...s, loading: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      toastError('Bookmark Failed!');
      set((s:any) => ({...s, loading: false}));
      return false;
    }
  },

  // delete bookmarks
  deleteBookmarkAct: async (payload: TDeleteBookmark) => {
    set((s:any) => ({...s, loading: true}));
    try {

      const promise = Axios.delete(
        API.deleteBookmarks + `/${payload.itemId}`,
      );

      const response = await promise;
      console.log('Delete Bookmark response: ', response);
      const data = response?.data;
      if (!data) return false;

      toastSuccess('Delete Bookmark Success!');
      set((s:any) => ({...s, loading: false,}))
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      toastError('Delete Bookmark Failed!');
      set((s:any) => ({...s, loading: false}));
      return false;
    }
  },

  // set notification
  setNotificationAct: (notification:any) => {
    const newNotification = {
      ...notification,
      createdAt: moment(notification.createdAt).format('MMM DD YYYY'),
      sender: {...notification.sender, createdAt: moment(notification.sender.createdAt).format('MMM DD YYYY')}
    };

    const updated = get().notifications;

    const oldInx:number = updated.findIndex((obj:any) => obj._id === newNotification._id);
    // if: post already exists =: replace with new one.
    if (oldInx !== -1) {
      updated[oldInx] = newNotification;
    } 
    else {
      // push new post into the state
      updated.push(newNotification);
    }

    set((s:any) => ({
      ...s,
      notifications: updated,
      hasNotifications: updated.some((notification:any) => !notification.isRead)
    }))
  },

  // crypto api
  fetchCryptoPriceAct: async () => {
    
    try{
      
      set((s:any) => ({
        ...s,
        loadCryptoPrices: true,
      }))
      
      const promise = Axios.get(
        API.getScraped,
      );

      const response = await promise;
      console.log('crypto price: ', response);
      const data = response?.data;
      if (!data) return false;

      // get history for the first crypto
      //await get().fetchCryptoHistoryAct({address: data.results[0].tokenAddress});

      set((s:any) => ({
        ...s,
        cryptoPrices: data.results,
      }))

      set((s:any) => ({
        ...s,
        loadCryptoPrices: false,
      }))
      return true;
    }catch(err:any) {
      console.log(err?.message || err);
      set((s:any) => ({
        ...s,
        loadCryptoPrices: false,
      }))
      return false;
    }

  },

  // single crypto historical price
  fetchCryptoHistoryAct: async (payload: TGetCryptoHistory) => {
    
    try{
      
      set((s:any) => ({
        ...s,
        loadCryptoHistory: true,
        loadHistoryHand: true,
      }))
      
      const promise = Axios.post(
        API.postCryptoHistory,
        payload,
      );

      const response = await promise;
      console.log('crypto history: ', response);
      const data = response?.data;
      if (!data) return false;

      set((s:any) => ({
        ...s,
        cryptoHistory: data.results,
      }))

      set((s:any) => ({
        ...s,
        loadCryptoHistory: false,
        loadHistoryHand: false,
      }))
      return true;
    }catch(err:any) {
      console.log(err?.message || err);
      set((s:any) => ({
        ...s,
        loadCryptoHistory: false,
        loadHistoryHand: false,
      }))
      return false;
    }

  },
}));

//@ts-ignore
const unsub = usePanelStore.subscribe((state:any) => {
  console.log('usePanelStore:', state);
});