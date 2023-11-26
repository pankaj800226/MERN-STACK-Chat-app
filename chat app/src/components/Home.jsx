
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { toast } from "react-hot-toast"
import { AiOutlineSend } from 'react-icons/ai'
import ReactScroolButton from 'react-scroll-to-bottom'
import io from 'socket.io-client'
const socket = io('http://localhost:5000')
const Home = () => {
  // const initialArray = localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : []

  const [username, setUserName] = useState('')
  const [chatActive, setChatActive] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    socket.on('received-message', (message) => {
      setMessages([...messages, message])
      console.log(message);
    // localStorage.setItem("messages", JSON.stringify(messages))

    });
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    const messageData = {
      message: newMessage,
      user: username,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }
    if (!newMessage == "") {
      socket.emit('send-message', messageData)
      setNewMessage('')
    } else {
      toast.success('Message can not be empty')
    }
  }

  return (
    <>

      <Toaster />
      <div className=' h-screen w-screen flex justify-center items-center bg-slate-100'>
        {
          chatActive ? (
            <div className='rounded-md w-full md:w-[80vw] lg:w-[50vw] p-3 shadow-2xl bg-slate-100'>
              <header className='flex justify-center'>
                <h1><img src="logo.png" alt="" className='h-7 w-7' /></h1>
              </header>
              <h1 className='text-center font-bold text-lg my-2 uppercase'>Group Chat</h1>
              <div>
              </div>
              <ReactScroolButton className=' h-[55vh] lg:h-[52vh]'>
                {/* messages  */}
                {
                  messages.map((e, index) => {
                    return (
                      <div key={index}
                        className={`flex rounded-md shadow-md my-5 w-fit ${username == e.user && "ml-auto"}`}
                      >
                        <div className='bg-green-400 flex justify-center items-center rounded-l-md p-2'>
                          <h1 className='font-bold'>{e.user.charAt(0).toUpperCase()}</h1>
                        </div>
                        <div className='px-2 bg-white  '>
                          <span className='text-sm'>{e.user}</span>
                          <h3 className='font-bold'>{e.message}</h3>
                          <h2 className='text-xs text-right'>{e.time}</h2>
                        </div>
                      </div>
                    )
                  })
                }
              </ReactScroolButton>
              {/* messages work end  */}
              {/* form work  */}
              <div>
                <form onSubmit={handleSubmit}
                  className='flex gap-3 md:gap-4 justify-between'
                >
                  <input type="text" placeholder='Type Your Message'
                    className='py-3 rounded-md outline-none border-2 px-2 w-full'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button type='submit'
                    className='bg-green-900 py-3 rounded-md px-6 font-bold text-white border-2
                    outline-none 
                    '
                  ><AiOutlineSend className='text-lg' /></button>
                </form>
              </div>
            </div>

          ) : (

            <div className='h-screen w-screen flex justify-center items-center gap-3 flex-col'>
              <img src="chat.png" alt="" className='w-20 h-20 cursor-pointer' />
              <input type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                placeholder='join...'
                className='text-center py-3 px-3 border-2 outline-none rounded-md text-black'
              />
              <button
                onClick={() => !username == "" && setChatActive(true)}
                className='bg-green-600 py-3 rounded-md text-white font-bold p-14'
              >Start chat</button>
            </div>

          )
        }

      </div>
    </>
  )
}

export default Home