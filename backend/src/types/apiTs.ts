
// POST: /auth/register
export type TRegister = {
  email: string,
}

// POST: /auth/login
export type TLogin = {
  otp: string,
  email: string,
}

// GET: /auth/logout

// GET: /auth/get

// GET: /posts
export type TGetPosts = {
  limit: number,
  page: number,
}

// GET: /api/v1/posts/user
//export type TGetPosts = {}

// GET: /posts/:id
export type TGetPost = {
  postId: string,
}

// POST: /posts
export type TCreatePost = {
  text: string,
  file: any,
}

// POST: /posts/vote
export type TVote = {
  postId: string,
  vote: string,
}

// GET: /notifications

// PUT: /notifications/read
export type TNotificationRead = {
  notificationId: string,
}

// PUT: /users (update-profile)
export type TUpdateUser = {
  username: string,
  file: any,
}

// GET: /scraped
// POST: /scraped/history
export type TGetHistory = {
  token: string,
}
// GET: /scraped/bookmarks

// POST: /scraped/bookmarks
export type TBookmark = {
  jsonData: string,
}

// DELETE: /scraped/bookmarks
export type TDeleteBookmark = {
  itemId: string,
}