import React, { Suspense } from "react";
import Loader from "./Loader";
import routes from "./routes";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./js/Navbar";
function App() {
  return (
    <BrowserRouter>
      {/* <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/treeview1">Tree View 1</NavLink>
        <NavLink to="/treeview2">Tree View 2</NavLink>
      </nav> */}
      <Navbar />

      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
