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
        if(userName?.length > 3) {
            localStorage.setItem("userName", userName)
            socket.emit("newUser", {userName, socketID: socket.id})
            setUserNameError(false);
            navigate("/chat")
        } else {
            setUserNameError('Username must be at least 3 characters');
        }
    }
    
    return (
        <div className="auth min-h-screen flex items-center justify-center backdrop-blur-[20px]">
            <div className="sm:min-w-[330px] min-w-[300px] sm:max-w-[400px] max-w-[400px]">
                <div className="text-center mb-4">
                    <img src="/logo.png" alt="logo" class="mx-auto max-w-[60px] mb-4" />
                    <p className="text-[19px] text-slate-300">Chat App, The Real Thing</p>
                </div>
                <div className="p-6 rounded gradient-bg border border-white/10">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label className="block mb-2 text-md text-slate-300">Username</label>
                            <input type="text" className={userNameError ? 'border-red-500 w-full text-xs bg-transparent focus:outline-none text-slate-300 border px-2 py-2 rounded' : 'border-white/10 w-full text-xs bg-transparent focus:outline-none text-slate-300 border px-2 py-2 rounded'} value={userName} 
                            onChange = {e => setUserName(e.target.value)} />
                            {/* error message username */}
                            {userNameError && (
                                <p className="text-red-500 text-xs my-2">{userNameError}</p>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <button type="submit" className="w-full text-sm bg-blue-500 text-center text-white px-2 py-2 rounded flex justify-center items-center">
                                <span>Join Chat</span> 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
