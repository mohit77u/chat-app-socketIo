import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client"

const socket = socketIO.connect("https://chat-app-socketio-cbwr.onrender.com")

export default function App() {
  return (
    <div className="bg-slate-900">
       <Router>
            <Routes>
                <Route path="/" element={<Home socket={socket}/>}></Route>
                <Route path="/chat" element={<ChatPage socket={socket}/>}></Route>
            </Routes>
        </Router>
    </div>
  )
}
