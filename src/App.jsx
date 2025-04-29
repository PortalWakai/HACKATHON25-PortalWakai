import React, { useState, useRef, useEffect } from 'react'; // Import useState
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBook, faNewspaper, faPenNib, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Adicione os ícones à biblioteca
library.add(faHouse, faBook, faNewspaper, faPenNib, faMagnifyingGlass);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Adicionar qualquer lógica adicional de navegação aqui
  };

  return (
    <>
      <div className="bg-slate-700 min-h-screen flex flex-col items-center">
        <Header />

        <NavBar onNavigate={handleNavigate} />

        <main className="container mx-auto p-4">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'publications' && <PublicationsPage />}
          {currentPage === 'publishers' && <PublishersPage />}
          {currentPage === 'authors' && <AuthorsPage />}
        </main>
      </div>  
    </>
  );
}

const carouselItems = [
  {
    title: 'Bem-vindo à nossa plataforma!',
    subtitle: 'Explore um universo de publicações.',
    imageUrl: 'https://source.unsplash.com/random/1600x600?books',
  },
  {
    title: 'Conecte-se com editoras e autores',
    subtitle: 'Tudo em um só lugar.',
    imageUrl: 'https://source.unsplash.com/random/1600x600?library',
  },
  {
    title: 'Publique e compartilhe',
    subtitle: 'Dê voz às suas ideias.',
    imageUrl: 'https://source.unsplash.com/random/1600x600?writing',
  },
];

function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const next = (currentIndex + 1) % items.length;
    timeoutRef.current = setTimeout(() => setCurrentIndex(next), 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, items.length]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-xl">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/60 to-transparent flex items-center">
              <div className="px-10 text-white max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold font-[Sansation]">{item.title}</h2>
                <p className="mt-4 text-lg md:text-xl  font-[Roboto Condensed]">{item.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-red-500' : 'bg-white/50'}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <div className="w-full">
        <Carousel items={carouselItems} />
      </div>

      <div className="w-full mt-10">
        <h1 className="text-5xl text-slate-100 font-medium font-[Roboto Mono]">EM DESTAQUE</h1>
      </div>
    </>
  );
}

function PublicationsPage() {
  return (
    <h1 className="text-3xl font-bold italic underline text-red-300">
      POSTS POSTS
    </h1>
  );
}

function PublishersPage() {
  return (
    <h1 className="text-3xl font-bold italic underline text-red-300">
      EDITORAS
    </h1>
  );
}

function AuthorsPage() {
  return (
    <h1 className="text-3xl font-bold italic underline text-red-300">
      AUTORES
    </h1>
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
        <div className="logo border-4 border-blue-200 rounded-[20%] p-1">
          <img 
            src="your-logo-path.jpg" // Add the actual logo path
            alt="logo" 
            className="w-20 h-20 object-cover bg-gray-600 rounded-[15%]"
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
