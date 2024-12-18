import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const key = "c9a717bf";

function App() {
  const [movies, setMovies] = useState([]);
  // search bar query
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedMovies(id) {
    setSelectedId(id);
  }

  function handleCloseSelectedMovies() {
    setSelectedId(null);
  }

 

  useEffect(function () {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}
      ` , {signal : controller.signal});

        if (!res.ok) throw new Error("something went wrong")
        console.log(res)
        const data = await res.json()
        console.log(data)

        if (data.Response == 'False') {
          throw new Error("Movie not Found");
        }
        console.log(data.Search)
        setMovies(data.Search)

      }
      catch (err) {
        // by chatgpt
        if (err.name === "TypeError") {
          console.log("Network error: Unable to fetch data. Check your internet connection.");
          setIsError("Network error: Check your internet connection.");
        } else {
          console.error(err.message);
          setIsError(err.message);
        }
        // console.error(err);
        // setIsError(err.message)
      }
      finally {
        setIsLoading(false);
      }
    }

    if (query.length === 0) {
      setIsError(false);
      setMovies([]);
      return;
    }

    fetchData();
    return function(){
      controller.abort();
    }
  }, [query])

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`)
  //   // http://www.omdbapi.com/?apikey=yourkey&s=inception
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       if (data.Search) setMovies(data.Search);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => console.error("Error fetching movies:", error));
  // }, [query]);

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <Found movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          {
            (isLoading && !isError) ? <Loader /> : (isError ? <ErrorP error={isError} /> :
              <MovieList movies={movies} handleSelectedMovies={handleSelectedMovies} />)
          }
        </ListBox>
        <WatchList selectedId={selectedId} handleCloseSelectedMovies={handleCloseSelectedMovies} />
      </Main>
    </>
  );
}

function Loader() {
  return (
    <div className="loader">Loading please wait .. </div>
  )
}

function ErrorP({ error }) {
  console.log("inside error function ", error);
  return (
    <span className="error">{error}</span>
  )
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />

      {children}
    </nav>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

const average = (arr) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0);

function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Found({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function MovieList({ movies, handleSelectedMovies }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} handleSelectedMovies={handleSelectedMovies} />
      ))}
    </ul>
  );
}

function Movie({ movie, handleSelectedMovies }) {
  return (
    <li onClick={() => handleSelectedMovies(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function SelectedMovie({ selectedId, handleCloseSelectedMovies, handleAddWatch, watched }) {

  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map(movies => movies.imdbID).
    includes(selectedId);


  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function AddNewMovie() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      // countRatingDecisions: countRef.current,

    }
    handleAddWatch(newMovie);
    handleCloseSelectedMovies();
  }
  { console.log(movie.Title) }

  useEffect(function () {
    async function FetcMovieDetail() {
      setLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`)
      const data = await res.json();
      console.log(data)
      setMovie(data)
      setLoading(false);
    }
    FetcMovieDetail();
  }, [selectedId])

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`

    return function(){
      document.title = "usePopcorn";
      console.log(`Clean Up effect for movie ${title}`)
    }

  }, [title]

  )

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === 'Escape') {
        handleCloseSelectedMovies();
        console.log("closing");
      }
    };
  
    // Add event listener
    document.addEventListener('keydown', handleEscape);
  
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleCloseSelectedMovies]);
  
  return (
    <div className="details">
      {
        isLoading ? <Loader /> :
          (<>
            <header>
              <button className="btn-black" onClick={handleCloseSelectedMovies}>
                &larr;
              </button>
              <img src={movie.Poster} href={`poster of the ${movie.Movie}`} />
              <div className="details-overview">
                <h2>{movie.Title}</h2>
                <p>{movie.Released} &bull; {movie.Runtime}</p>
                <p>{movie.Genre}</p>
                <h4>{movie.Country}</h4>
              </div>
            </header>

            <section>
              <div className="rating">
                {!isWatched ?
                  (<>
                    <StarRating maxRating={10} size={23} onSetRating={setUserRating} />
                    {
                      userRating > 0 &&
                      (<button className="btn-add" onClick={() => AddNewMovie()}>
                        Add movie to watch list
                      </button>)
                    }
                  </>)
                  : <p>Already in watched</p>}


              </div>
              <p><em>{movie.Plot}</em></p>
              <p>Starring {movie.Actors}</p>
              <p>Directed by {movie.Director}</p>
            </section>
          </>)
      }
    </div>
  )
}

function WatchList({ selectedId, handleCloseSelectedMovies }) {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState([]);

  function handleAddWatch(movie) {

    setWatched((watched) => [...watched, movie])

  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="box">
      {/* Toggle Button */}
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {/* Conditional Rendering */}
      {isOpen2 && (
        <div>
          {selectedId ? (
            // Show SelectedMovie only if selectedId is present
            <SelectedMovie selectedId={selectedId}
              handleCloseSelectedMovies={handleCloseSelectedMovies}
              handleAddWatch={handleAddWatch}
              watched={watched}
            />
          ) : (
            // Show Summary and WatchedMovie if no selectedId
            <>
              <Summary
                watched={watched}
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
              />
              <ul className="list">
                {watched.map((movie) => (
                  <WatchedMovie key={movie.imdbID} movie={movie} handleDeleteWatched={handleDeleteWatched} />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="box">
  //     <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
  //       {isOpen2 ? "–" : "+"}
  //       {console.log(isOpen2)}
  //     </button>
  //     {isOpen2 && (
  //       <>
  //         selectedId ? (<SelectedMovie selectedId={selectedId} /> ) :
  //         (<>
  //           <Summary
  //             watched={watched}
  //             avgImdbRating={avgImdbRating}
  //             avgUserRating={avgUserRating}
  //             avgRuntime={avgRuntime}
  //           />
  //           <ul className="list">
  //             {watched.map((movie) => (
  //               <WatchedMovie key={movie.imdbID} movie={movie} />
  //             ))}
  //           </ul>
  //         </>
  //         )
  //       </>
  //     )}
  //   </div>
  // );
}

function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)}>
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function Summary({ watched, avgImdbRating, avgUserRating, avgRuntime }) {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, handleDeleteWatched }) {
  console.log(movie)
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}

export default App;
