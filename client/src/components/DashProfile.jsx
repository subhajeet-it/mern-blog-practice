import React, { useRef, useState } from "react";
import { Alert, Button, TextInput,Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInFailed, deleteInStart, deleteInSuccess, signoutInSuccess, updateInFailed, updateInStart, updateInSuccess } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({
  })
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file)); // Show a local preview
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/uploadImg", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        setImageFileUrl(data.url); // Set uploaded image URL
        setImageFile(null); // Clear the local preview
        console.log(data.url);
        setFormData({...formData,profilePicture:data.url})
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  const textInputChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
      if(Object.keys(formData).length===0){
        setUpdateUserError('No changes made');
        return;
      }
   
    
      try{
        dispatch(updateInStart());
        const res=await fetch(`/api/user/update/${currentUser._id}/`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(formData)
        })
        const data=await res.json();
        if(!res.ok){
          dispatch(updateInFailed(data.message));
          setUpdateUserError(data.message);
        }else{
          dispatch(updateInSuccess(data));
          setUpdateUserSuccess("User's profile updated successfully");
        }
      }catch(error){
        dispatch(updateInFailed(error.message));
        setUpdateUserError(error.message);
      }
  }

const handleDeleteUser=async()=>{
  setShowModal(false);
  try{
    dispatch(deleteInStart());
    const res=await fetch(`/api/user/delete/${currentUser._id}/`,{
      method:"DELETE",
    })
    const data=await res.json();
    if(!res.ok){
      dispatch(deleteInFailed(data.message));
    }else{
      dispatch(deleteInSuccess(data));
      navigate('/sign-in');
    }
  }catch(error){
    dispatch(deleteInFailed(error.message));
  }
}

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
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser?.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username} 
          onChange={textInputChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email} 
          onChange={textInputChange}
        />
        <TextInput type="password" id="password" placeholder="password"  
        onChange={textInputChange}/>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      {updateUserError && <Alert color="failure">{updateUserError}</Alert>}
      {updateUserSuccess && <Alert color="success">{updateUserSuccess}</Alert>}

      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Profile?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser }>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={()=>setShowModal(true)}>Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignOut}>Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
