import "./App.css";
import GamePage from "./pages/Game-Page/GamePage";
import tenziesLogo from "./assets/tenzies-logo.svg";

function App() {
  return (
    <>
      <img src={tenziesLogo}></img>
      <GamePage />
      <footer>
        <div>
          A{" "}
          <a href="https://github.com/ahmed-marzook">KaizenFlow Technologies</a>{" "}
          project by{" "}
          <a href="https://github.com/ahmed-marzook/Tenzies-Learning-React">
            Ahmed Marzook
          </a>
        </div>
        <div>
          Inspired by <a href="https://scrimba.com/@bobziroll">Bob Ziroll</a>
        </div>
      </footer>
    </>
  );
}

export default App;
