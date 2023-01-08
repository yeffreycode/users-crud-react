import "./App.css";
import Router from "./router";
import { Link } from "react-router-dom";
import { AppState } from "./State";
function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/create"}>new</Link>
            </li>
          </ul>
        </nav>
      </header>
      <AppState>
        <Router />
      </AppState>
    </div>
  );
}

export default App;
