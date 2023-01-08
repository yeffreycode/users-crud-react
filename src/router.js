import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import UserForm from "./UserForm";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/create" element={<UserForm />} />
      <Route path="/update/:id" element={<UserForm />} />
      <Route path="/*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};
export default Router;
