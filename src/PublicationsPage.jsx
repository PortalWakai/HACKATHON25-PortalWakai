import { useState, useRef, useEffect } from 'react';
import './App.css';

const carouselItemsA = [
  {
    title: 'Ilíada',
    imageUrl: 'https://m.media-amazon.com/images/I/71W6HnSKQiL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'Odisseia',
    imageUrl: 'https://m.media-amazon.com/images/I/71cvHFJKp2L._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'Eneida',
    imageUrl: 'https://m.media-amazon.com/images/I/91sJwHCY8nL._AC_UF1000,1000_QL80_.jpg',
  },
];

const carouselItemsB = [
  {
    title: 'It',
    imageUrl: 'https://m.media-amazon.com/images/I/91g9Dvtf+jL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'O Iluminado',
    imageUrl: 'https://m.media-amazon.com/images/I/81Q+pJi4NjL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'Eu não tenho boca e preciso gritar',
    imageUrl: 'https://m.media-amazon.com/images/I/A1TFWwAc-8L._AC_UF1000,1000_QL80_.jpg',
  },
];

const carouselItemsC = [
  {
    title: 'Bladerunner',
    imageUrl: 'https://editoraaleph.com.br/cdn/shop/files/capas_site_700x1000_BladeRunner.png?v=1714612720',
  },
  {
    title: 'Grandes Esperanças',
    imageUrl: 'https://m.media-amazon.com/images/I/71LdmGeFZDL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'Garoto de Ipanema',
    imageUrl: 'https://acdn-us.mitiendanube.com/stores/003/344/305/products/vol-1-2bc52b6352014427d717434477566365-1024-1024.png'
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
    <div className="relative w-80 h-[800px] overflow-hidden rounded-lg shadow-xl">
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
            <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/10 to-transparent flex items-center">
              <div className="px-10 text- text-white max-w-xl">
                <h2 className="text-3xl md:text-3xl font-bold font-[Sansation]">{item.title}</h2>
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

export default function PublishersPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-500 font-[Montserrat] mb-6">
          Gêneros em Destaque
        </h1>
      </div>
      <div className="flex justify-evenly place-content-center">
        <div className="text-center">
          <h2 className="text-xl font-bold font-[Montserrat] mb-4 text-red-500">Poemas Épicos</h2>
          <Carousel items={carouselItemsA} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold font-[Montserrat] mb-4 text-red-500">Terror/Horror</h2>
          <Carousel items={carouselItemsB} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold font-[Montserrat] mb-4 text-red-500">Romance</h2>
          <Carousel items={carouselItemsC} />
        </div>
      </div>
    </>
  );
}
