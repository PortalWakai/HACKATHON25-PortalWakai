import { useState, useRef, useEffect } from 'react';
import './App.css';

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

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      ),
      5000
    );

    return () => resetTimeout();
  }, [currentIndex, items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-xl">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/60 to-transparent flex items-center">
              <div className="px-10 text-white max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold font-[Sansation]">{item.title}</h2>
                <p className="mt-4 text-lg md:text-xl font-[Roboto Condensed]">{item.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-red-500' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Carousel items={carouselItems} />
      
      <div className="w-full mt-10">
        <h1 className="text-3xl md:text-5xl text-slate-100 font-medium font-[Montserrat]">
          EM DESTAQUE
        </h1>
      </div>
    </div>
  );
}