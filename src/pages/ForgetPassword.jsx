import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import axios from "axios";
import { Clipboard } from "lucide-react"; // Added missing import

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendotp`,   // ✅ FIXED route
        { email },
        { withCredentials: true }
      );
      setLoading(false);
      console.log(result.data);
      setStep(2);
      toast.success(result.data.message || "OTP sent to your email");
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error(err.response?.data?.message || "Failed to send OTP");
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyotp`,   // ✅ FIXED route
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.data);
      setStep(3);
      toast.success(result.data.message || "OTP verified successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const resetPassword = async () => {
    setLoading(true);
    try {
      if (newPassword !== conPassword) {
        setLoading(false);
        return toast.error("Passwords do not match");
      }
      const result = await axios.post(
        `${serverUrl}/api/auth/resetpassword`,   // ✅ FIXED route
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      toast.success(result.data.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.response?.data?.message || "Failed to reset password");
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {/* Step 1: Enter Email */}
      {step === 1 && (
        <div className='bg-white rounded-xl p-8 max-w-md w-full shadow-md'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget Your Password</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                Enter Your Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder='you@example.com'
                name="email"
                required
                className='mb-4 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <button
                className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer'
                disabled={loading}
                onClick={sendOtp}
              >
                {loading ? <Clipboard size={20} color='white' /> : "Send OTP"}
              </button>
            </div>
          </form>
          <div className='text-sm text-center mt-4 cursor-pointer'
            onClick={() => navigate("/login")}>
            Back to Login
          </div>
        </div>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <div className='bg-white rounded-xl p-8 max-w-md w-full shadow-md'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter OTP</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="OTP" className='block text-sm font-medium text-gray-700'>
                Please enter the 4-digit code sent to your email
              </label>
              <input
                type="text"
                id="OTP"
                placeholder='1234'
                name="OTP"
                required
                className='mb-4 mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />

              <button
                className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer'
                disabled={loading}
                onClick={verifyOtp}
              >
                {loading ? <Clipboard size={20} color='white' /> : "Verify OTP"}
              </button>
            </div>
          </form>
          <div className='text-sm text-center mt-4 cursor-pointer'
            onClick={() => navigate("/login")}>
            Back to Login
          </div>
        </div>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <div className='bg-white rounded-xl p-8 max-w-md w-full shadow-md'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
          <p className='text-sm text-gray-500 text-center mb-6'>
            Enter a new password below to regain access to your account
          </p>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                name="password"
                required
                className='mb-4 mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />

              <label htmlFor="conpassword" className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>
              <input
                type="password"
                id="conpassword"
                placeholder="*******"
                name="conpassword"
                required
                className='mb-4 mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setConPassword(e.target.value)}
                value={conPassword}
              />

              <button
                className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer'
                disabled={loading}
                onClick={resetPassword}
              >
                {loading ? <Clipboard size={20} color='white' /> : "Reset Password"}
              </button>
            </div>
          </form>
          <div className='text-sm text-center mt-4 cursor-pointer'
            onClick={() => navigate("/login")}>
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
// import React from 'react'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../App';
// import { toast } from 'react-toastify';
// import axios from "axios";
// // import { Clipboard } from "lucide-react";



// const ForgetPassword = () => {
//     const navigate = useNavigate();
//     const [step,setStep] = useState(1);
//     const[email,setEmail] = useState("");
//     const[otp,setOtp] = useState("");
//     const[newPassword,setNewPassword] = useState("");
//     const[conPassword,setConPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     // for step 1 
//     const sendOtp = async()=>{
//         setLoading(true);
//         try{
       
//             const result  = await axios.post(serverUrl + "/api/auth/sendotp"
//                 ,{email} , {withCredentials: true})
//                 setLoading(false);
//                 console.log(result.data);
//                 setStep(2);
//                 toast.success(result.data.message || "OTP sent to your email");

//         }catch(err){
//             console.error("Error sending OTP:", err); 
//             toast.error(err.response.data.message || "Failed to send OTP");
//             setLoading(false);
                  
//         }

//     }

//     // for step 2 
//     const verifyOtp = async()=>{
//         setLoading(true);
//      try {
//         const result = await axios.post(serverUrl + "/api/auth/verifyotp",  
//         {email, otp}, {withCredentials: true}); 
//          console.log(result.data);
//          setStep(3);
//          toast.success(result.data.message || "OTP verified successfully");


//      }catch(error){
//          console.error("Error sending OTP:", error); 
//          toast.error(error.response.data.message);
//           setLoading(false);
//      }
//     }


//     // step 3 

//     const resetPassword = async()=>{
//         setLoading(true);
//         try{
//             if(newPassword !== conPassword){
//                   return toast.error("Passwords do not match");
    
             
//             }
//             const result = await axios.post(serverUrl + "/api/auth/resetpassword",
//             {email,  newPassword}, {withCredentials: true});
//             console.log(result.data);
//             setLoading(false);
//             toast.success(result.data.message || "Password reset successfully");
//             navigate("/login");
//         }catch(error){
//             console.error("Error resetting password:", error);
//             toast.error(error.response.data.message || "Failed to reset password");
//         }
//     }

//   return (
//     <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 '>
//         {/* step 1  */}
//       {step == 1 &&<div className='bg-white  rounded-xl p-8 max-w-md  w-full shadow-md'>
//         <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget Your Password</h2>
//         <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
//             <div>
//             <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
//                 Enter Your Email Address
//             </label>
//          <input type="email" id="email" placeholder='you@example.com' name="email" required className='mb-4 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
//          onChange={(e)=>setEmail(e.target.value)} value={email}/>

//         <button className='w-full bg-black text-white 
//         py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer' disabled={loading} onClick={sendOtp}
//    >{loading ? <Clipboard size={30} color='white'/> : "Send OTP"}</button>

//                 </div>
//                 </form>       
//         <div className='text-sm text-center mt-4' 
//         onClick={()=>navigate("/login")}>Back to Login</div>
        
//      </div>}


//       {/* step 2  */}
//       {step == 2 &&<div className='bg-white  rounded-xl p-8 max-w-md  w-full shadow-md'>
//         <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter OTP</h2>
//         <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>
//             <div>
//             <label htmlFor="OTP" className='block text-sm font-medium text-gray-700'>
//                 Please enter the 4-digit code sent to your email
//             </label>
//          <input type="text" id="OTP" placeholder='1234' name="OTP" required className=' mb-4 mt-1  block w-full py-2 px-4  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
//          onChange={(e)=>setOtp(e.target.value)} value={otp}/>

//         <button className='w-full bg-black text-white 
//         py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer'  disabled={loading}
//         onClick={verifyOtp}> {loading ? <Clipboard size={30} color='white'/> : "Verify OTP"}    </button>

//                 </div>
//                 </form>       
//         <div className='text-sm text-center mt-4' 
//         onClick={()=>navigate("/login")}>Back to Login</div>
        
//         </div>}
        
        
        
//         {/* step 3  */}
//      {step == 3 && (
//   <div className='bg-white rounded-xl p-8 max-w-md w-full shadow-md'>
//     <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
//     <p className='text-sm text-gray-500 text-center mb-6'>
//       Enter a new password below to regain access to your account
//     </p>
//     <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//       <div>
//         <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
//           New Password
//         </label>
//         <input 
//           type="password" 
//           id="password" 
//           placeholder="*******" 
//           name="password" 
//           required 
//           className='mb-4 mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
//           onChange={(e) => setNewPassword(e.target.value)} 
//           value={newPassword}
//         />

//         <label htmlFor="conpassword" className='block text-sm font-medium text-gray-700'>
//           Confirm Password
//         </label>
//         <input 
//           type="password" 
//           id="conpassword" 
//           placeholder="*******" 
//           name="conpassword" 
//           required 
//           className='mb-4 mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
//           onChange={(e) => setConPassword(e.target.value)} 
//           value={conPassword}
//         />

//         <button 
//           className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer'
//           onClick={resetPassword}
//         >
//           {loading ? <Clipboard size={30} color='white' /> : "Reset Password"}
//         </button>
//       </div>
//     </form>
//     <div 
//       className='text-sm text-center mt-4' 
//       onClick={() => navigate("/login")}
//     >
//       Back to Login
//     </div>
//   </div>
// )}



//     </div>
//   )
// }

// export default ForgetPassword
