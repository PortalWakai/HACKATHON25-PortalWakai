import { useState, useRef, useEffect } from 'react';
import './App.css';

import PublishersPage from './PublishersPage';
import PublicationsPage from './PublicationsPage';
import AuthorsPage from './AuthorsPage';
import HomePage from './HomePage';
// importando  páginas

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faBook, 
  faNewspaper, 
  faPenNib, 
  faMagnifyingGlass 
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faHouse, faBook, faNewspaper, faPenNib, faMagnifyingGlass);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Rolagem para o topo após navegação
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Header />
      <NavBar onNavigate={handleNavigate} />
      
      <main className="flex-1 container mx-auto p-4">
        {renderPage()}
      </main>
    </div>
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

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
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
      {/* Botão do Perfil */}
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

      {/* Dropdown Menu */}
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
          
          <div className="border-t border-gray-100"></div>
          
          <button
            onClick={() => {
              // Lógica de logout aqui
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


function Header() {
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
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}

function NavBar({ onNavigate }) {
  const [activeItem, setActiveItem] = useState(1); // State for active item

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
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon and text */}
            <div className="flex flex-col items-center transform group-hover:scale-110 transition-transform">
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs font-medium tracking-wider">{item.label}</span>
            </div>
            
            {/* Active indicator */}
            <div className={`absolute bottom-0 w-3/4 h-1 bg-red-500 transition-all duration-300 
              ${activeItem === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75'}`} />
          </button>
        ))}
      </div>
    </nav>
  );
}
