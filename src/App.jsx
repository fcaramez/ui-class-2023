import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Users from "./Pages/Users";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Landing />}
      />
      <Route
        path="/users"
        element={<Users />}
      />
    </Routes>
  );
}

export default App;
