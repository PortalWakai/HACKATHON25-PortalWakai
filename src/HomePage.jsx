import { useState, useRef, useEffect } from 'react';
import './App.css';

const carouselItems = [
  {
    title: 'Bem-vindo à nossa plataforma!',
    subtitle: 'Explore um universo de livros.',
    imageUrl: 'https://img.freepik.com/fotos-premium/o-desejo-de-viajar-pelo-livro-captura-visualmente-o-desejo-de-explorar-novos-mundos-atraves-dos-livros_964851-51918.jpg',
  },
  {
    title: 'Conecte-se com editoras e autores',
    subtitle: 'Tudo em um só lugar.',
    imageUrl: 'https://www.universidadedolivro.com.br/wp-content/uploads/2023/10/UNIL-BANNER-V.FINAL_.jpg',
  },
  {
    title: 'Publique e compartilhe',
    subtitle: 'Dê voz às suas ideias.',
    imageUrl: 'https://www.shutterstock.com/image-illustration/colored-silhouettes-people-speech-bubbles-260nw-2183575945.jpg',
  },
];

const adsItems = [
  {
    imageUrl: 'https://cdn2.penguin.com.au/covers/original/9781646514939.jpg',
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/61Kt3d+mhuL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/61zHq7tExYL._AC_UF1000,1000_QL80_.jpg',
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
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
            className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? 'bg-red-500' : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselAd({ items }) {
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
    <div className="relative w-full lg:w-[400px] h-[400px] lg:h-[800px] hidden lg:block overflow-hidden rounded-lg shadow-xl">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/60 to-transparent flex items-center" />
          </div>
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? 'bg-red-500' : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function HomePageTopBooks({ texto }) {
  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 font-[Montserrat]">{texto}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className="w-full h-[300px] bg-white/10 rounded-lg p-4 hover:bg-white/20 transition">
            <h3 className="text-xl font-semibold font-[Roboto Mono] text-white">Livro {item}</h3>
            <p className="text-gray-300 font-[Roboto Condensed] mt-2">Resumo do livro...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Carousel items={carouselItems} />

        <div className="w-full mt-10 md:mb-5 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <span className="hidden sm:block w-[10%] h-1 bg-white shadow-xl" />
          <h1 className="sm:text-3xl lg:text-4xl xl:text-5xl text-slate-100 font-medium font-[Montserrat] my-4 sm:my-0">
            EM DESTAQUE
          </h1>
          <span className="hidden sm:block lg:w-[60%] w-[50%] h-1 bg-white shadow-xl" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <CarouselAd items={adsItems} />
          <HomePageTopBooks texto="" />
        </div>
      </div>
    </>
  );
}