import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Triangle } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader">
      <Triangle height="100" width="100" color="silver" ariaLabel="loading" />
      <h6 style={{ fontSize: "45px", color: "silver" }}>Rolling...</h6>
    </div>
  );
}
