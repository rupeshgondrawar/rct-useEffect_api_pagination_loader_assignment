import "./App.css";
import { useEffect, useState } from "react";

const getData = (page) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`).then(
    (res) => {
      return res.json();
    }
  );
};

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page,setPage]=useState(1);

  useEffect(() => {
    fetchAndUpdateData(page);
  }, [page]);

  const fetchAndUpdateData = async (page=1) => {
    try {
      setLoading(true);
      const data = await getData(page);
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleChange=(changeBy)=>{
      setPage(page+changeBy);
  }

  if(loading){
    return <img src="https://icon-library.com/images/loading-gif-icon/loading-gif-icon-9.jpg"/>
  }

  return (
    <div className="App">
      <h1>Posts</h1>

      <ul>
        {posts.map((postItem) => (
          <li key={postItem.id}>{postItem.id} {"-"}  {postItem.title}</li>
        ))}
      </ul>

      <button disabled={page===1} onClick={()=>handleChange(-1)}>prev</button>
      <button>{page}</button>
      <button disabled={page===10} onClick={()=>handleChange(1)}>next</button>
    </div>
  );
}

export default App;
