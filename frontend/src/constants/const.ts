
export const LIMIT = 5;

export const ROUTES = {
  register: () => {
    return {
      route: '/register',
      link: '/register'
    }
  },

  login: () => {
    return {
      route: '/login',
      link: '/login'
    }
  },

  dashboard: () => {
    return{
      route: '/',
      link: `/?limit=${LIMIT}&page=1`
    }
  },
  singlePost: (id:string='') => {
    return{
      route: '/singlePost/:id',
      link: `/singlePost/${id}`
    }
  },
}