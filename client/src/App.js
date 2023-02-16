import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import StoresList from "./features/stores/StoresList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditStore from "./features/stores/EditStore";
import NewStore from "./features/stores/NewStore";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import NewStoreForm from "./features/stores/NewStoreForm";
import ViewStore from "./features/stores/ViewStore";
import ItemsList from "./features/items/ItemsList";
import EditItem from "./features/items/EditItem";
import NewItemForm from "./features/items/NewItemForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditStoreForm from "./features/stores/EditStoreForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* <PersistLogin/>  */}
          <Route element={<PersistLogin />}>
            {/* <Prefetch/> helps keep protected routes state longer than default */}
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUserForm />} />

                  {/* end of protected users route = /dash/users/*/}
                </Route>

                <Route path="shops">
                  <Route index element={<StoresList />} />
                  {/* <Route path=":id" element={<EditStore />} /> */}
                  <Route path="new" element={<NewStore />} />
                  <Route path="add" element={<NewStoreForm />} />
                  <Route path="update/:id" element={<EditStore />} />
                  <Route path="view/:id" element={<ViewStore />} />

                  {/* complex routes shops/id */}
                  <Route path=":id">
                    <Route index element={<EditStore />} />
                    <Route path="add/item" element={<NewItemForm />} />
                    <Route path="update/:id" element={<EditItem />} />
                  </Route>

                  {/* end of protected notes route = /dash/shops */}
                </Route>

                <Route path="items">
                  <Route index element={<ItemsList />} />
                  <Route path="add" element={<NewItemForm />} />

                  {/* end of protected notes route = /dash/items */}
                </Route>

                {/* end of protected routes =  /dash */}
              </Route>
            </Route>
          </Route>

          {/* end of public routes = / */}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
