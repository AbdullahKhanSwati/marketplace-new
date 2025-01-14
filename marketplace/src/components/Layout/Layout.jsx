import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { ToastContainer } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';

import 'react-toastify/dist/ReactToastify.css';
 const Layout=(props)=> {
  return (
    <div>
  <Header />
        <main style={{minHeight:"75vh"}}>
<ToastContainer />
<Toaster />
            {props.children}
        </main>
        <Footer />
        </div>
  )
}

export default Layout