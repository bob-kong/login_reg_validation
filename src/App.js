import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter,Routes,Route,Link ,Navigate} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={ <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
