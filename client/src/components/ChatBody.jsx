import React from 'react'
import {useNavigate} from "react-router-dom"
import Moment from 'react-moment';

export default function ChatBody({messages, typingStatus, lastMessageRef}) {

    const navigate = useNavigate()
  
    // handle chat leave 
    const handleLeaveChat = () => {
        localStorage.removeItem("userName")
        navigate("/")
        window.location.reload()
    }
    return (
        <>
            {/* top header */}
            <header className='flex justify-between items-center bg-slate-900 p-4'>
                <div>
                    <h2 className='text-gray-300 text-[20px]'>Chats</h2>
                    <p className='text-xs text-green-600 mt-2'>{typingStatus}</p>
                </div>
                <button className='bg-red-500 text-white rounded px-5 py-2 flex gap-2 justify-center items-center' onClick={handleLeaveChat}>
                    Leave Chat
                    <img src="/images/logout.png" alt="logout" className='max-w-[20px]' />
                </button>
            </header>

            {/* message container */}
            <div className='pb-20 pt-5 md:min-h-[85vh] md:max-h-[85vh] min-h-[66vh] max-h-[66vh] overflow-y-auto relative px-4'>
                {messages?.map(message => (
                    message?.name === localStorage.getItem("userName") ? (
                        // left message
                        <div className="flex justify-start" key={message?.id}>
                            <div class="text-left my-4">
                                <div className="flex items-end gap-4">
                                    <div className="user-icon">
                                        <p class="text-sm font-medium text-white bg-blue-500 rounded-full uppercase w-8 h-8 flex justify-center items-center">{message?.name[0]}</p>
                                    </div>
                                    <div class="user-message py-3 px-3 min-w-[100px] rounded-lg rounded-bl-none w-auto inline-block bg-white/10 relative">
                                        <p class="text-white text-md">{ message?.text }</p>
                                        <p class="text-gray-200 text-xs mt-2">
                                            <Moment fromNow>{ message?.created_at }</Moment>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ): (
                        // right message
                        <div className="flex justify-end" key={message?.id}>
                            <div class="text-right my-4">
                                <div className="flex items-end gap-4">
                                    <div class="user-message py-3 px-3 min-w-[100px] rounded-lg rounded-br-none w-auto inline-block bg-blue-500 relative">
                                        <p class="text-white text-md text-left">{ message?.text }</p>
                                        <p class="text-gray-200 text-xs mt-2">
                                            <Moment fromNow>{ message?.created_at }</Moment>
                                        </p>
                                    </div>
                                    <div className="user-icon">
                                        <p class="text-sm font-medium text-white bg-green-500 rounded-full uppercase w-8 h-8 flex justify-center items-center">{message?.name[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
                {/* scroll to last message ref div */}
                {messages?.length > 0 && (
                    <div ref={lastMessageRef}></div> 
                )}
            </div>
        </>
    )
}
