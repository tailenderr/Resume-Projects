export default function FoodItem({ className, setSelectedItem, item }) {
  console.log("items");
  return (
    <div
      className={className}
      style={{
        border: "4.2px solid white",
        position: "relative",
        borderRadius: "2px",
      }}
      onClick={() => {
        setSelectedItem(item);
      }}
    >
      <img className="recipe-img" src={item.strMealThumb} />
      <div className="title-container">
        <h3 className="recipe-title">{item.strMeal}</h3>
      </div>
    </div>
  );
}
