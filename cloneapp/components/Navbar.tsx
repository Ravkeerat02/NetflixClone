import NavbarItem from "./NavbarItem"

const Navbar =() =>{
    return (
        <nav className="w-full fixed z-40">
            <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc bg-opacity-90">

            <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo"/>
            <div className="flex-row ml-8 gap-7 hidden lg:flex">
                <NavbarItem  label="Movies"></NavbarItem>
                <NavbarItem  label="Series"></NavbarItem>
                <NavbarItem  label="New and Popular"></NavbarItem>
                <NavbarItem  label="My list"></NavbarItem>
                <NavbarItem  label="Broswe by lang"></NavbarItem>
            </div>
            <div className ="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative ">
                <p className="text-white text-sm">Browse</p>
            </div>
            </div>
        
        </nav>
    )
}

export default Navbar