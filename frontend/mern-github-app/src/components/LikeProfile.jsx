import React from 'react'
import toast from 'react-hot-toast'
import { FaHeart } from "react-icons/fa";
import { useAuthContext } from '../context/AuthContext';

const LikeProfile = (userProfile) => {
    const {authUser}=useAuthContext();
    const userProf=userProfile.userProfile;
    const isOwnProfile=(authUser?.username === userProf?.login);
   console.log(userProf.login);

    const handleLikeButton=async()=>{
        //send request to end point
        try {
            const res=await fetch(`/api/users/like/${userProf.login}`,{
                method:"POST",
                credentials:"include",
            })
            const data=await res.json();
            if(data.error) throw new Error(data.error);
            toast.success(data.message)
        } catch (error) {
            toast.error(error.message);
        }
    }

if(!authUser || isOwnProfile)
return null;


  return (
    <button className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex
    items-center gap-2'  onClick={handleLikeButton}>
        <FaHeart size={16}/>Like Profile
    </button>
  )
}

export default LikeProfile