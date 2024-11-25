import React from 'react'
import Header from "./components/Header";
import { Outlet } from 'react-router-dom';
import FooterCom from './components/Footer';
const App = () => {
  return (
   <>
   <Header/>
   <Outlet/>
   <FooterCom/>
   </>
  )
}

export default App