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
        console.log(messages)
    }, [messages]);

    return (
        <div className="bg-slate-900">
            <div className="flex flex-wrap justify-between items-start">
                <ChatBar socket={socket}/>
                <div className='w-full md:ml-[350px] md:min-h-screen md:max-h-screen min-h-[94vh] max-h-[100vh] relative'>
                    <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
                    <ChatFooter socket={socket}/>
                </div>
            </div>
        </div>
    )
}
