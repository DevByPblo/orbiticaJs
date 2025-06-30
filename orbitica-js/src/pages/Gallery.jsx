import React, { useEffect, useContext } from 'react';
import OrbiticaContext from '../context/OrbiticaContext';
import { Rocket, ImageIcon } from 'lucide-react';
import Navbar from '../components/Navbar';

const Gallery = () => {
  const { fetchGallery, galleryData, loading, error } = useContext(OrbiticaContext);

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
  
      <div className="min-h-screen w-full bg-gradient-to-b from-black via-slate-900 to-blue-950 text-white overflow-hidden relative">
         <Navbar />
        <header className="flex flex-col items-center justify-center text-center pt-28 pb-16 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            NASA Gallery
          </h1>
          <Rocket className="text-blue-400 w-8 h-8" />
        </header>

        {loading && (
          <div className="text-center mt-20 text-xl text-blue-300 animate-pulse">
            Loading space wonders...
          </div>
        )}

        {error && (
          <div className="text-center mt-20 text-red-400">
            Error loading gallery: {error}
          </div>
        )}

        {!loading && !error && galleryData?.collection?.items?.length > 0 ? (
          <ul className="grid grid-cols-2 gap-8 px-12" >
            {galleryData.collection.items.map((item, index) => {
              const imageUrl = item.links?.[0]?.href;
              const title = item.data?.[0]?.title;
              const nasaId = item.data?.[0]?.nasa_id;
              const externalLink = `https://images-assets.nasa.gov/image/${nasaId}/${nasaId}~medium.jpg`;

              return (
                <li
                  key={index}
                  className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:scale-105 transition transform shadow-lg"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-80 object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-gray-400">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-white text-lg font-semibold truncate">
                      {title || 'Untitled'}
                    </h3>
                  </div>
                  <a
                    href={externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 text-sm text-gray-900 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-gray-900 font-medium hover:brightness-110 transition"
                  >
                    Click to learn more...
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          !loading &&
          !error && (
            <div className="text-center text-gray-400 mt-20">
              No images found. Try refreshing or check your API key.
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Gallery;
