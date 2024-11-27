import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
const DashSideBar = () => {
  const location = useLocation();
  const dispatch=useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut=async()=>{
    try{
      const res=await fetch('/api/user/signout',{
        method:'POST'
      })
      const data=await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutInSuccess());
      }
    }catch(error){
      console.log(error.message);
      
    }
  }

  return (
    <Sidebar className="w-full md:w-56" aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={`/dashboard?tab=profile`} >
            <Sidebar.Item
              active={tab === "profile"}
              label={"User"}
              icon={HiUser}
              labelColor="dark"
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSideBar;
