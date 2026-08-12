import React from "react";
import Home from "../Home/home";
import banner from "../Home/pictures/Group 2.png";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4001/get_all_authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);
  return (
    <div>
      <Home banner={authorBanner} />
      
    </div>
  );
};

export default Authors;
