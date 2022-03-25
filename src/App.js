import Home from "./routes/home/home.componenet";

import { Routes, Route, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>I am nav</h1>
      </div>
      <Outlet />
    </div>
  );
};

const Shop = () => {
  return <h1>Shop Now</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
