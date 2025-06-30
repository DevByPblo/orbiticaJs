import { Link } from 'react-router-dom';
import { Rocket, Gamepad2 } from 'lucide-react';

const Navbar = () =>{

    return <>
    
      
      <header className="w-full px-6 py-6 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
          
          <Link to='/'>
             <div className="flex items-center gap-3">
            <Rocket className="w-7 h-7 text-blue-400" />
            <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Orbitica
            </h1>
          </div>
          
          
          
          </Link>
       
          <div className="hidden md:flex items-center gap-6">
            {['Gallery', ].map((link) => (
                <Link to={`/${link.toLocaleLowerCase()}`}>
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition duration-200 hover:scale-105 "
              >
                {link}
              </a>
                </Link>
            ))}
            <Link to="/home">
              <button className="flex items-center gap-2 border border-purple-500 text-purple-800 hover:bg-purple-600 hover:text-black px-4 py-2 rounded-xl transition duration-200 shadow-md hover:scale-105">
                <Gamepad2 className="h-4 w-4" />
                Play Game
              </button>
            </Link>
            <Link to="/">
          
            <button className="border border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-black px-4 py-2 rounded-xl transition duration-200 shadow-md hover:scale-105">
              Dashboard
            </button>
              </Link>
          </div>
        </nav>
      </header>
    </>



}

export default Navbar