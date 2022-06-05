import FoodItem from "./FoodItem";
import { memo } from "react";

function Searched({ data, keyword, setSelectedItem, loader, error }) {
  console.log("List");
  if (error) {
    return <h2>Sorry! not found, we will add soon...😀</h2>;
  }

  return (
    <>
      {keyword.length !== 0 ? (
        <h2 style={{ color: "white" }}>Search result for '{keyword}':</h2>
      ) : null}

      <br></br>
      <div className="grid-container">
        {data.map((item) => {
          return (
            <FoodItem
              item={item}
              className="grid-item"
              setSelectedItem={setSelectedItem}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(Searched);
