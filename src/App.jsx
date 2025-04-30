import { useState, useRef, useEffect } from 'react';
import './App.css';

import PublishersPage from './PublishersPage';
import PublicationsPage from './PublicationsPage';
import AuthorsPage from './AuthorsPage';
import HomePage from './HomePage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faBook, 
  faNewspaper, 
  faPenNib, 
  faMagnifyingGlass,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faHouse, faBook, faNewspaper, faPenNib, faMagnifyingGlass, faUsers);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-us');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'publications':
        return <PublicationsPage />;
      case 'publishers':
        return <PublishersPage />;
      case 'authors':
        return <AuthorsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-slate-700 min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} scrollToAbout={scrollToAbout} />
      <NavBar onNavigate={handleNavigate} scrollToAbout={scrollToAbout} />
      
      <main className="flex-1 container mx-auto p-4">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer id="about-us" className="bg-slate-800 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Sobre Nós</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-400">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Quem Somos
            </h3>
            <p className="text-slate-300">
              O Portal Wakai é uma plataforma dedicada a conectar leitores, autores e editoras,
              proporcionando uma experiência única no mundo da literatura.
            </p>
          </div>
          
          <div className="bg-slate-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-400">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Nossa Missão
            </h3>
            <p className="text-slate-300">
              Facilitar a descoberta de novos autores e obras, criando pontes entre criadores
              e apreciadores de conteúdo literário.
            </p>
          </div>
          
          <div className="bg-slate-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-400">
              <FontAwesomeIcon icon={faPenNib} className="mr-2" />
              Contato
            </h3>
            <p className="text-slate-300">
              <strong>Email:</strong> wakaiportal@gmail.com<br />
              <strong>Telefone:</strong> (XX) XXXX-XXXX
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-600 mt-8 pt-6 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Portal Wakai. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function SearchBar() {
  return (
    <div className="search-bar w-[50%] h-[34%] border-4 border-blue-200 rounded-[20px] bg-white/10 backdrop-blur-sm flex items-center px-4">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-xl" />
      <input 
        type="text" 
        placeholder="Buscar..." 
        className="ml-2 bg-transparent outline-none text-white placeholder-white w-full"
      />
    </div>
  );
}

function ProfileDropdown({ onNavigate, scrollToAbout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
          US
        </div>
        <span className="text-white text-2xl hidden md:inline">Usuário</span>
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800">usuario@email.com</p>
          </div>
          
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Meu Perfil
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Configurações
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Notificações
          </a>
          <a
            href="#about-us"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              scrollToAbout();
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Sobre Nós
          </a>
          <div className="border-t border-gray-100"></div>
          
          <button
            onClick={() => {
              console.log('Usuário deslogado');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

function Header({ onNavigate, scrollToAbout }) {
  return (
    <header className="relative w-full h-40 z-50 bg-slate-800 shadow-lg">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <div className="logo w-28 h-32 flex justify-center place-items-center p-1">
          <img 
            src="./portalwakai.png" 
            alt="Logo Wakai" 
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
        <SearchBar />
        <div className="profile-button">
          <ProfileDropdown onNavigate={onNavigate} scrollToAbout={scrollToAbout} />
        </div>
      </div>
    </header>
  );
}

function NavBar({ onNavigate, scrollToAbout }) {
  const [activeItem, setActiveItem] = useState(1);

  const menuItems = [
    { 
      id: 1, 
      label: 'HOME PAGE', 
      icon: <FontAwesomeIcon icon={faHouse} />, 
      action: () => onNavigate('home') 
    },
    { 
      id: 2, 
      label: 'PUBLICAÇÕES', 
      icon: <FontAwesomeIcon icon={faBook} />, 
      action: () => onNavigate('publications') 
    },
    { 
      id: 3, 
      label: 'EDITORAS', 
      icon: <FontAwesomeIcon icon={faNewspaper} />, 
      action: () => onNavigate('publishers') 
    },
    { 
      id: 4, 
      label: 'AUTORES', 
      icon: <FontAwesomeIcon icon={faPenNib} />, 
      action: () => onNavigate('authors') 
    },
    { 
      id: 5, 
      label: 'SOBRE NÓS', 
      icon: <FontAwesomeIcon icon={faUsers} />, 
      action: () => {
        onNavigate('home');
        setTimeout(scrollToAbout, 100);
      }
    }
  ];

  return (
    <nav className="sticky top-0 w-full h-20 bg-slate-900 z-30 shadow-2xl">
      <div className="container mx-auto h-full flex justify-center items-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              item.action();
              setActiveItem(item.id);
            }}
            className={`relative w-full h-full flex flex-col justify-center items-center 
              text-white transition-all duration-300 group overflow-hidden
              ${activeItem === item.id ? 'text-red-400' : 'hover:text-red-300'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col items-center transform group-hover:scale-110 transition-transform">
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs font-medium tracking-wider">{item.label}</span>
            </div>
            
            <div className={`absolute bottom-0 w-3/4 h-1 bg-red-500 transition-all duration-300 
              ${activeItem === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75'}`} />
          </button>
        ))}
      </div>
    </nav>
  );
}