import { useEffect, useState } from "react";
import Loader from "./Loader";
import "./App.css";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);

  useEffect(() => {});
  if (!showLandingPage) {
    return <Loader />;
  }
  return <></>;
}

export default App;
