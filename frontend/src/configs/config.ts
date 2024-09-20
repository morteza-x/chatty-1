
export const NODE_ENV = import.meta.env.VITE_NODE_ENV;
export const API_URL = 
  NODE_ENV === 'development' ? 
    import.meta.env.VITE_API_URL_DEV 
    : import.meta.env.VITE_API_URL_PRO;

export const SOCKET_URL = NODE_ENV === 'development'  
  ? import.meta.env.VITE_SOCKET_URL_DEV
  : import.meta.env.VITE_SOCKET_URL_PRO;

export const MORALIS_API_KEY = import.meta.env.VITE_MORALIS_API_KEY;