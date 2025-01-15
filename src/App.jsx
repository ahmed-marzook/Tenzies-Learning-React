import "./App.css";
import GamePage from "./pages/Game-Page/GamePage";
import tenziesLogo from "./assets/tenzies-logo.svg";

function App() {
  return (
    <>
      <img src={tenziesLogo}></img>
      <main>
        <GamePage />
      </main>
    </>
  );
}

export default App;
