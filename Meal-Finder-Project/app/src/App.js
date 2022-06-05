import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import Searched from "./Searched";
import ShowDetails from "./ShowDetails";

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(false);
  const myRef = useRef(null);
  const [suggestion, setSuggestion] = useState(["bread", "pasta", "paneer"]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        searchRecipe();
      }
    };
    document.addEventListener("keypress", listener);
    return () => {
      document.removeEventListener("keypress", listener);
    };
  }, []);

  const searchRecipe = () => {
    // console.log(myRef.current.value);
    suggestion.push(myRef.current.value);
    setShowSuggestion(false);
    setKeyword("");
    setSelectedItem({});
    setError(false);
    if (myRef.current.value) {
      setKeyword(myRef.current.value);
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${myRef.current.value}`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          if (response.meals !== null) {
            // console.log("item fetched");
            setData(response.meals);
          } else {
            setData([]);
            setError(true);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setData([]);
      setKeyword("");
      setSelectedItem({});
      setError(false);
      alert("Please enter a search term");
    }
    myRef.current.value = "";
  };
  const shuffleRecipe = () => {
    setShowSuggestion(false);
    setError(false);
    setKeyword("");
    setData([]);
    setSelectedItem({});
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setSelectedItem(response.meals[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div className="App">
      <div className="container">
        <h1 className="heading">Meal Finder</h1>
        <input
          placeholder="Search for meals or keywords"
          type="text"
          ref={myRef}
        />
        <button className="search-btn" onClick={searchRecipe}>
          <i class="fas fa-search"></i>
        </button>
        <button className="random-btn" onClick={shuffleRecipe}>
          <i class="fas fa-random"></i>
        </button>
        {showSuggestion === true ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {suggestion.map((item) => {
              return <div>item</div>;
            })}
          </div>
        ) : null}
      </div>
      <div>
        <Searched
          data={data}
          keyword={keyword}
          setSelectedItem={setSelectedItem}
          error={error}
        />

        {Object.keys(selectedItem).length !== 0 ? (
          <ShowDetails selectedItem={selectedItem} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
