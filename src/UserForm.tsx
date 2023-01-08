import { FormEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "./State";
import { UserI } from "./UserType";
import { useNavigate, useParams, useLocation } from "react-router-dom";
const UserForm = () => {
  const [userForm, setUserForm] = useState<UserI | null>({ name: "", lastname: "", phone: 0, email: "" });
  const [isEdit, setIsEdit] = useState(false);
  const { addUser, updateUser, getUser } = useContext(AppContext);
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  let id = params.id;
  const saveAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEdit) {
      addUser && addUser(userForm!);
      return navigate("/");
    }
    updateUser && updateUser(parseInt(id || ""), userForm!);
    navigate("/");
    console.log("editing");
  };
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    setUserForm({ ...userForm!, [name]: value });
  };
  useEffect(() => {
    if (!id) return;
    if (id) setIsEdit(true);
    let user = getUser && getUser(parseInt(id || ""));
    if (user) {
      setUserForm(user);
    } else {
      setUserForm(null);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (location.pathname === "/create") {
      setIsEdit(false);
      setUserForm({ name: "", lastname: "", phone: 0, email: "" });
    }
  }, [location.pathname]);

  return (
    <section id="users-form">
      {!userForm ? (
        <h3>User Not Found</h3>
      ) : (
        <form onSubmit={saveAction}>
          <fieldset>
            <label htmlFor="user_name">name</label>
            <input autoComplete="off" onChange={onChange} value={userForm?.name} name="name" id="user_name" type="text" />
          </fieldset>
          <fieldset>
            <label htmlFor="user_lastname">lastname</label>
            <input autoComplete="off" onChange={onChange} value={userForm?.lastname} name="lastname" id="user_lastname" type="text" />
          </fieldset>
          <fieldset>
            <label htmlFor="user_email">email</label>
            <input autoComplete="off" onChange={onChange} value={userForm?.email} name="email" id="user_email" type="email" />
          </fieldset>
          <fieldset>
            <label htmlFor="use_phone">phone</label>
            <input autoComplete="off" onChange={onChange} value={userForm?.phone} name="phone" id="use_phone" type="tel" />
          </fieldset>
          <fieldset>
            <input id="user_save" type="submit" value={isEdit ? "Update" : "Save"} />
          </fieldset>
        </form>
      )}
    </section>
  );
};

export default UserForm;
