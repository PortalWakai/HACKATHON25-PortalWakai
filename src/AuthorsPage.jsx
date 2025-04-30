import './App.css';

export default function AuthorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 font-[Montserrat] mb-6">
        Nossos Autores
      </h1>
      <div className="bg-white/10 rounded-lg p-6">
        <ul className="space-y-4">
          {['Autor 1', 'Autor 2', 'Autor 3'].map((author, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-500"></div>
              <span className="text-white">{author}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}