import { useContext } from "react";
import { AppContext } from "./State";
import { useNavigate } from "react-router-dom";
import { UserI } from "./UserType";
const User = ({ user, index }: { user: UserI; index: number }) => {
  const { removeUser } = useContext(AppContext);
  let navigate = useNavigate();
  return (
    <tr>
      <td>
        <span>{user.name}</span>
      </td>
      <td>
        <span>{user.lastname}</span>
      </td>
      <td>
        <span>{user.phone}</span>
      </td>
      <td>
        <span>{user.email}</span>
      </td>
      <td>
        <button onClick={() => navigate("/update/" + index)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </td>
      <td>
        <button onClick={() => removeUser && removeUser(index)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
const Home = () => {
  const { users } = useContext(AppContext);
  return (
    <section id="users-table">
      <table>
        <thead>
          <tr>
            <th>
              <h1>users</h1>
            </th>
          </tr>
          <tr>
            <th>name</th>
            <th>lastname</th>
            <th>phone</th>
            <th>email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return <User index={index} user={item} key={index} />;
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Home;
