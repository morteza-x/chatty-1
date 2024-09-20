import 
//toast, 
{ Toaster } from "react-hot-toast"
//@ts-ignore
import { CLIENT_URL_DEV, NODE_ENV, SOCKET_URL } from "./configs/config"

import Router from "./routes/Router"
import { BaseModal } from "./compos/BaseModal"
//import { API_URL } from "./configs/config"
//const toastSuccess = (msg: string) => toast.success(msg || 'Some Success!');

function App() {
  return (
    <>  
      <Router/>

      <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        // style: {
        //   background: '#363636',
        //   color: '#fff',
        // },

        // Default options for specific types
        success: {
          duration: 6000,
          style:{
            backgroundColor: '#86efac',
            //marginTop: '',
          }
        },
        error: {
          style:{
            backgroundColor: '#fecaca'
          }
        },
        loading: {
          style:{
            backgroundColor: '#fb923c'
          }
        }
      }}
      />

      {/* base modal */}
      <BaseModal/>
    </>
  )
}

export default App
