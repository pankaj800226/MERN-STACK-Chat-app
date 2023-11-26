

const Header = () => {
    return (
        <div className='bg-purple-600 p-2 shadow-md flex text-center h-13' >
            <h1><img src="logo.png" alt="" className="h-7 w-7" /></h1>
            <a href="" className="px-2 pt-1 text-center text-white">Chat App</a>
            <div className="ml-auto">
                <h1 className="mr-7 text-white cursor-pointer pt-1">Real Time Chat App</h1>
            </div>

        </div>
    )
}

export default Header