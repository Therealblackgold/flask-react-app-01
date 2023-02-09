import { BsFillPersonPlusFill, BsPeopleFill, BsShop } from "react-icons/bs";
import { MdAddToPhotos } from "react-icons/md";
import { Link } from "react-router-dom";

let data;

const Widget = ({ type }) => {
  switch (type) {
    case "users":
      data = {
        title: "Users",
        url: "/dash/users",
        link: "View users",
        background: "#F8F9FA",
        icon: (
          <BsPeopleFill className="widget-icon" style={{ color: "white" }} />
        ),
      };
      break;
    case "addUser":
      data = {
        title: "new user",
        url: "/dash/users/new",
        link: "add user",
        background: "#F8F9FA",
        icon: (
          <BsFillPersonPlusFill
            className="widget-icon"
            style={{ color: "white" }}
          />
        ),
      };
      break;
    case "stores":
      data = {
        title: "stores",
        url: "/dash/shops",
        link: "view stores",
        background: "#F8F9FA",
        icon: <BsShop className="widget-icon" style={{ color: "white" }} />,
      };
      break;
    case "addStore":
      data = {
        title: "new store",
        url: "/dash/shops/new",
        link: "add store",
        background: "#F8F9FA",
        icon: (
          <MdAddToPhotos className="widget-icon" style={{ color: "white" }} />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="col widget">
      <div
        className="p-3 border card-component"
        style={{ backgroundColor: data.background }}
      >
        <h1> {data.icon}</h1>
        <h3 className="mt-3">{data.title}</h3>
        <span>
          <Link to={data.url} style={{ color: "#212529f4" }}>
            {data.link}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Widget;
