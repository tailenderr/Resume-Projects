import { memo } from "react";

function ShowDetails({ selectedItem }) {
  console.log("details");
  const arr = [null];

  const getIngredients = () => {
    arr.length = 0;
    for (let i = 1; i <= 20; i++) {
      if (selectedItem[`strIngredient${i}`]) {
        arr.push(
          selectedItem[`strIngredient${i}`] +
            "-" +
            selectedItem[`strMeasure${i}`]
        );
      } else break;
    }
    console.log(arr);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ paddingTop: "10px", paddingBottom: "13px" }}>
        {selectedItem.strMeal}
      </h1>
      <div className="selecteditem-container">
        <img className="selected-img" src={selectedItem.strMealThumb} />
      </div>
      <div
        style={{
          width: "70%",
          padding: "15px",
          margin: "20px",
          marginTop: "40px",
          border: "2px dashed #e09850 ",
          borderRadius: "5px",
        }}
      >
        <p style={{ letterSpacing: "0.5px", lineHeight: "1.5" }}>
          {selectedItem.strCategory}
        </p>
        <p style={{ letterSpacing: "0.5px", lineHeight: "1.5" }}>
          {selectedItem.strArea}
        </p>
      </div>
      <div className="description-container">
        <p
          className="description"
          style={{
            letterSpacing: "0.5px",
            lineHeight: "1.5",
            width: "90%",
          }}
        >
          {selectedItem.strInstructions}
        </p>
      </div>
      <h2>Ingredients</h2>
      <ul className="ingredient-list">
        {getIngredients()}
        {arr.map((ingredient) => {
          return <li>{ingredient}</li>;
        })}
      </ul>
    </div>
  );
}

export default memo(ShowDetails);
