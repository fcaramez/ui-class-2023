import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Users from "./Pages/Users";
import UserDetails from "./Pages/UserDetails";

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
      <Route
        path="/user/:id"
        element={<UserDetails />}
      />
    </Routes>
  );
}

export default App;
