import { useState, useRef, useEffect } from 'react';
import './App.css';

const carouselItemsA = [
  {
    title: 'Editora 34',
    imageUrl: 'https://feiradolivrodaunesp.com.br/noticias/wp-content/uploads/2022/04/34-logo.png',
  },
  {
    title: 'Kaiju Editora',
    imageUrl: 'https://lh3.googleusercontent.com/proxy/319Tb2PGZJErxoVnRlYQNFlPoVd0TE8c-rv6qcr48OPUji2y5pIuu0a0e7GiX5zK5BNqcrjm3yYJMSXAO8Y',
  },
  {
    title: 'Citadel Grupo Editorial',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGkBL3EON9vIbV5Eq969url57FUBlY8SzszbkKn2zyleKGRKUgsWtQF1I4JzvsA-xy46tfMPvjz4TWixZmSlk66L6KneRzbNQLN4wWKA68jY4lLc56BkhHLjfRQz_hh0l-EMjk7mdZMRb3/s600-c/Citadel+Logo.jpg',
  },
];

const carouselItemsB = [
  {
    title: 'Image Comics',
    imageUrl: 'https://ovicio.com.br/wp-content/uploads/2020/02/20200215-imagecomics.jpg',
  },
  {
    title: 'Panini Comics',
    imageUrl: 'https://i0.wp.com/www.portaldonerd.com.br/wp-content/uploads/2022/05/paninicomics-e1557503444106.jpg',
  },
  {
    title: 'Dark Horse Comics',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Dark_Horse_Comics_logo.svg/1200px-Dark_Horse_Comics_logo.svg.png',
  },
];

const carouselItemsC = [
  {
    title: 'Editora Pearson',
    imageUrl: 'https://simplissimo.com.br/wp-content/uploads/2012/07/pearson-authors.jpg',
  },
  {
    title: 'RELX Group',
    imageUrl: 'https://relx.wd3.myworkdayjobs.com/relx/assets/logo',
  },
  {
    title: 'Thompson Reuters',
    imageUrl: 'https://www.thomsonreuters.com.br/content/dam/ewp-m/images/brazil/en/artworked-images/tr-logo-thumb.png.transform/rect-768/q90/image.png'
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
    <div className="relative w-[440px] h-[180px] overflow-hidden rounded-lg shadow-xl">
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
          Editoras Parceiras
        </h1>
      </div>
      <div className="flex justify-evenly place-content-center">
        <div className="text-center">
          <h2 className="text-xl font-bold font-[Montserrat] mb-4 text-red-500"></h2>
          <Carousel items={carouselItemsA} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold font-[Montserrat] mb-4 text-red-500"></h2>
          <Carousel items={carouselItemsB} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold font-[Montserrat] mb-4 text-red-500"></h2>
          <Carousel items={carouselItemsC} />
        </div>
      </div>
    </>
  );
}
