import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react";
import { searchMovies,getPopularMovies } from "../services/api";
import '../css/Home.css';



function Home(){
    const [searchQuery, setsearchQuery] = useState("");
    const [movies, setmovies] = useState([]);
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies();
                setmovies(popularMovies);
            }catch(err){
                console.error(err);
                seterror("Failed to fetch pipular movies");
            }finally{
                setloading(false);
            }
        }
        loadPopularMovies();
    }, [])
    
    const handlesearch = async (e) =>{
        e.preventDefault(); //  prevent form submission
        if(!searchQuery.trim()) return;// if search query is empty, do nothing
        if (loading) return; // prevent multiple searches while loading

        setloading(true);
        try{
            const searchResults = await searchMovies(searchQuery); // search for movies based on the query
            setmovies(searchResults); // update the movies state with search results
            if (searchResults.length === 0) {
                seterror("No movies found for your search query.");
            }
            else{
                seterror(null);
            }
        }catch(err){
            console.log(err);
            seterror("Failed to search movies...");
        }finally{
            setloading(false);
        }
    }

    return(
        <div className="Home">
            <form onSubmit={handlesearch} className="search-form">
                <input type="text" placeholder="Search for a movie..." className="search-input" value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>


            {error && <div className="error-message">{error}</div>}

            {loading ?(<div className="loading">Loading...</div>) : (
                <div className="movies-grid">
                {movies.map((movie) => 
                    movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (<MovieCard movie={movie} key={movie.id} />)
                    )}
                </div>
            )}
            
            
        </div>
    );
}

export default Home