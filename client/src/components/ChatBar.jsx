import React, {useState, useEffect} from 'react'

export default function ChatBar({socket}) {

    const [users, setUsers] = useState([])
    const [menu, setMenu] = useState(true)


    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

    return (
        <div className='md:fixed left-0 top-0 md:w-[350px] w-full z-20 bg-slate-900 h-full border-r border-white/10'>
            <div class="flex justify-between items-center p-4">
                <h2 className='text-white text-[20px]'>Chat App, The Real Thing</h2>
                <div class="md:hidden block">
                    <img src="/images/menu.png" alt="menu" class="max-w-[30px] cursor-pointer"  onClick={() => setMenu(!menu)}/>
                </div>
            </div>
            {menu && (
                <div>
                    <label class="block text-slate-200 text-md px-4 mb-4 py-2 border-b border-t border-white/10 ">Active Users</label>
                    <div className='px-4 py-2'>
                        {users.map((user) => (
                            <h5 class="text-white/60 hover:text-white transition-all duration-150 pb-2 text-sm text-ellipsis sm:max-w-[170px] max-w-[110px] whitespace-nowrap overflow-hidden capitalize" key={user.socketID}>{user.userName}</h5>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
