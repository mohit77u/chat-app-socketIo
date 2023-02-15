import React, {useState} from 'react'

export default function ChatFooter({socket}) {

    const [message, setMessage] = useState("")
    const handleTyping = () => socket.emit("typing",`${localStorage.getItem("userName")} is typing`)

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.trim() && localStorage.getItem("userName")) {
            socket.emit("message", 
                {
                    text: message, 
                    name: localStorage.getItem("userName"), 
                    id: `${socket.id}${Math.random()}`,
                    socketID: socket.id
                }
            )
        }
      setMessage("")
    }

    return (
        <div className='bg-slate-900 p-4 absolute bottom-0 right-0 z-20 w-full'>
            <form className='flex justify-between items-center gap-4' onSubmit={handleSendMessage}>
                <input 
                    type="text" 
                    placeholder='Write message' 
                    className='border border-white/10 rounded w-full py-3 px-4 bg-transparent text-gray-300 focus:outline-none focus:ring-0' 
                    value={message} 
                    onChange={e => {handleTyping(); setMessage(e.target.value)} }
                    // onKeyDown={handleTyping}
                />
                <button className="bg-blue-500 px-4 py-3 text-white font-medium rounded">Send</button>
            </form>
        </div>
    )
}
