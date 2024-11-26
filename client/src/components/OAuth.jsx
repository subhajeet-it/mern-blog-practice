import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider ,getAuth,signInWithPopup} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const auth=getAuth(app);
  const handleGoogleClick =async () => {
  
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try{
        const resultFromGoogle = await signInWithPopup(auth,provider);
        const resGoogle=await fetch("/api/auth/google",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:resultFromGoogle.user.displayName,
                email:resultFromGoogle.user.email,
                photoURL:resultFromGoogle.user.photoURL
            })
        });
        const dataGoogle=await resGoogle.json();
       if(resGoogle.ok){
        dispatch(signInSuccess(dataGoogle));
        navigate("/");
       }
        
        
    }catch(error){
        console.log(error);

    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
