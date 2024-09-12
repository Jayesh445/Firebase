import './App.css';
import { Auth } from './components/auth';
import { auth, db, storage } from './config/firebase-config';
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [releaseDate, setReleaseDate] = useState(0);
  const [recievedOscar, setRecievedOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [fileUpload ,setFileUpload] = useState(null);

  const movieCollectionRef = collection(db, "movies");

  async function getMovieList() {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setMovieList(filteredData)

    } catch (err) {
      console.error(err);

    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }
  const updateMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
      setUpdatedTitle('');
    } catch (err) {
      console.error(err);
    }
  }
const uploadFile =async () => {
  if(!uploadFile) return ;
  const fileFolderRef = ref(storage ,`projectFile/${fileUpload.name}`);
  try{
    await uploadBytes(fileFolderRef,fileUpload);
  }catch(err){
    console.error(err);
    
  }
}
  useEffect(() => {
    getMovieList();
  }, [])

  const HandleNewMovie = async (e) => {
    try {
      e.preventDefault();
      await addDoc(movieCollectionRef, { 
        title: movieName,
        releaseDate: releaseDate, 
        recievedOscar: recievedOscar,
        userId:auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    } finally {
      setMovieName("");
      setRecievedOscar(false);
      setReleaseDate(0);
    }
  }

  return (
    <div className="App">
      <Auth />

      <div>
        <form onSubmit={HandleNewMovie}>
          <input type='text' placeholder='Movie Name ' value={movieName} onChange={e => setMovieName(e.target.value)} /><br />
          <input type='number' placeholder='Release Date ' value={releaseDate} onChange={e => setReleaseDate(e.target.value)} /><br />
          <input type='checkbox' name='recivedOscar' id='yes' checked={recievedOscar} value={recievedOscar} onChange={e => setRecievedOscar(e.target.checked)} />
          <label htmlFor='yes'>recieved Oscar</label><br />
          <button type='submit'>New Movie ✨✨</button><br />
        </form>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.recievedOscar ? 'green' : 'red' }}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
            <input type='text' placeholder='New Movie Title' value={updatedTitle} onChange={e => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateMovie(movie.id)}> Update Movie Title</button>
          <div>
            <input type='file' onChange={e => setFileUpload(e.target.files[0])}/>
            <button onClick={uploadFile}>Upload File </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
