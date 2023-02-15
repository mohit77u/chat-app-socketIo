import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")

export default function App() {
  return (
    <div className="bg-dark-primary">
       <Router>
            <Routes>
                <Route path="/" element={<Home socket={socket}/>}></Route>
                <Route path="/chat" element={<ChatPage socket={socket}/>}></Route>
            </Routes>
        </Router>
    </div>
  )
}
