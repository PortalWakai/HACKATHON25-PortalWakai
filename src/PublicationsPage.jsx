import './App.css';

export default function PublicationsPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 font-[Montserrat]">
          Últimas Publicações
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder para cards de publicações */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition">
              <h3 className="text-xl font-semibold font-[Roboto Mono] text-white">Publicação {item}</h3>
              <p className="text-gray-300 font-[Roboto Condensed] mt-2">Resumo da publicação...</p>
            </div>
          ))}
        </div>
      </div>
    );
  }