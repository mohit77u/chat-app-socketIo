import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

export default function Home({socket}) {

    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [userNameError, setUserNameError] = useState(false)

    // handle form submit function
    const handleSubmit = (e) => {
        e.preventDefault();

        // check for username field validations
        if(userNameError?.length > 3) {
            localStorage.setItem("userName", userName)
            socket.emit("newUser", {userName, socketID: socket.id})
            setUserNameError(false);
            navigate("/chat")
        } else {
            setUserNameError('Username must be at least 3 characters');
        }
    }
    
    return (
        <div class="auth min-h-screen flex items-center justify-center backdrop-blur-[20px]">
            <div class="sm:min-w-[330px] min-w-[300px] sm:max-w-[400px] max-w-[400px]">
                <div class="text-center mb-4">
                    <p class="text-[16px] text-slate-300">Chat App, The Real Thing</p>
                </div>
                <div class="p-6 rounded gradient-bg border border-white/10">
                    <form onSubmit={handleSubmit}>
                        <div class="form-group mb-3">
                            <label class="block mb-2 text-xs text-slate-300">Username</label>
                            <input type="text" class={userNameError ? 'border-red-500 w-full text-xs bg-transparent focus:outline-none text-slate-300 border px-2 py-2 rounded' : 'border-white/10 w-full text-xs bg-transparent focus:outline-none text-slate-300 border px-2 py-2 rounded'} value={userName} 
                            onChange={e => setUserName(e.target.value)} />
                            {/* error message username */}
                            {userNameError && (
                                <p class="text-red-500 text-xs my-2">{userNameError}</p>
                            )}
                        </div>
                        <div class="form-group mb-3">
                            <button type="submit" class="w-full text-sm bg-blue-500 text-center text-white px-2 py-2 rounded flex justify-center items-center">
                                <span>Sign In</span> 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
