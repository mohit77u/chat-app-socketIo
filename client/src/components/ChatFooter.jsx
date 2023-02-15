import React, {useState} from 'react'

export default function ChatFooter({socket}) {

    const [message, setMessage] = useState("");
    // const [file, setFile] = useState([]);

    // handle typing 
    const handleTyping = () => socket.emit("typing",`${localStorage.getItem("userName")} is typing`)

    const handleSendMessage = (e) => {
        e.preventDefault()
        // check if message have value then send it
        if(message.trim() && localStorage.getItem("userName")) {
            socket.emit("message", 
                {
                    text: message, 
                    type: 'text', 
                    name: localStorage.getItem("userName"), 
                    id: `${socket.id}${Math.random()}`,
                    socketID: socket.id,
                    created_at: new Date(),
                }
            )
        } 
      setMessage("")
    }

    // const handleAttachement = (e) => {
    //     setFile(e.target.files[0])
    // }

    return (
        <div className='bg-slate-900 p-4 md:absolute fixed bottom-0 right-0 z-20 w-full'>
            <form className='flex justify-between items-center gap-4' onSubmit={handleSendMessage}>
                <div className='flex justify-between items-center gap-2 w-full'>
                    <label className="cursor-pointer">
                        <img src="/images/attachment.png" className="max-w-[30px]" alt="attach" />
                        {/* <input type='file' className="hidden" onChange={handleAttachement} /> */}
                    </label>
                    {/* input */}
                    <input 
                        type="text" 
                        placeholder='Enter message here...' 
                        className='border border-white/10 rounded w-full py-3 px-4 bg-transparent text-gray-300 focus:outline-none focus:ring-0' 
                        value={message} 
                        onChange={e => {handleTyping(); setMessage(e.target.value)} }
                        // onKeyDown={handleTyping}
                    />
                </div>
                {/* send button */}
                <button className="bg-green-500 px-4 py-3 text-white font-medium rounded flex gap-2 justify-center items-center">
                    Send
                    <img src="/images/send.png" alt="send" className='max-w-[20px]' />
                </button>
            </form>
        </div>
    )
}
