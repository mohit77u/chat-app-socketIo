import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

export default function ChatPage({socket}) {

    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);

    useEffect(()=> {
        socket.on("messageResponse", data => setMessages([...messages, data]))
    }, [socket, messages])

    useEffect(()=> {
        socket.on("typingResponse", data => setTypingStatus(data))
    }, [socket])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    return (
        <div className="bg-slate-900 max-h-screen">
            <div className="flex flex-wrap justify-between items-start">
                <ChatBar socket={socket}/>
                <div className='w-full md:ml-[22rem] min-h-screen max-h-screen relative'>
                    <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
                    <ChatFooter socket={socket}/>
                </div>
            </div>
        </div>
    )
}
