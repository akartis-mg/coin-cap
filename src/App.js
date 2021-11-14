import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import DasboardScreen from "./screens/DashboardScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DasboardScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
