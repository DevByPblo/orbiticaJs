import { useState, createContext } from "react";


const OrbiticaContext = createContext();

const myAPI = import.meta.env.VITE_API_KEY

export const OrbiticaProvider = ({children}) => {
    
const [galleryData, setGaleryData] = useState([])
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

    const fetchGallery = async () =>{
        setLoading(true);
        setError(null);
       try {
           const response = await fetch(`https://images-api.nasa.gov/search?q=galaxy&media_type=image`);
            const data = await response.json()
            console.log('G DATA:',data)
            setGaleryData(data)
        } catch (err) {
            console.error("Could not fetch gallery", err);
            setError(err.message || "Failed to fetch");
        } finally {
            setLoading(false);
        }
  };


    return (

        <OrbiticaContext.Provider value={{fetchGallery, galleryData, loading, error}}>
            {children}
        </OrbiticaContext.Provider>

    )

}

export default OrbiticaContext