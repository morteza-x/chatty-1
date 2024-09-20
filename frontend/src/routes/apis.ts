//import {Axios} from '@/configs/axiosConfig'

const auth = '/auth';
const posts = '/posts';
const users = '/users';
const notifications = '/notifications';
const scraped = '/scraped';

export const API = {
  // POST: /auth/register
  postRegister: auth + '/register',

  // POST: /auth/login
  postLogin: auth + '/login',

  // GET: /auth/logout
  getLogout: auth + '/logout',

  // GET: /auth/get
  getGetAuth: auth + '/get',

  // GET: /posts
  getFetchPosts: posts,

  // GET: /api/v1/posts/user
  getGetUserPosts: posts + '/user',

  // GET: /posts/:id
  getGetPost: (param:string) => posts + '/' + param,
 
  // POST: /posts
  postCreatePosts: posts,
  
  // POST: /posts/vote
  postSendVote: posts + '/vote',

  // GET: /notifications
  getNotifications: notifications,

  // PUT: /notifications/read
  putSetNotificationRead: notifications + '/read',
  
  // PUT: /users (update-profile)
  putUpdateUser: users,

  // GET: /scraped
  getScraped: scraped,
  // GET: /scraped/bookmarks
  getBookmarks: scraped + '/bookmarks',

  // POST: /scraped/bookmarks
  postBookmarks: scraped + '/bookmarks',

  // DELETE: /scraped/bookmarks
  deleteBookmarks: scraped + '/bookmarks',

  // POST: /scraped/history
  postCryptoHistory: scraped + '/history',
};  
