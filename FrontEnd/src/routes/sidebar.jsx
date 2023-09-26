import { TbSmartHome } from "react-icons/tb";
import { LuCircle } from "react-icons/lu";
import { BsChat } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
// import { LuCircle } from "react-icons/lu";
// import { LuCircle } from "react-icons/lu";
// import { LuCircle } from "react-icons/lu";
// import { LuCircle } from "react-icons/lu";
// import { LuCircle } from "react-icons/lu";

const routes = [
  {
    path: "/",
    icon: <TbSmartHome />,
    name: "Dashboard",
    submenu: [
      {
        path: "/", //url
        icon: <LuCircle />, // icon component
        name: "Analytics", // name that appear in Sidebar
      },
      {
        path: "/",
        icon: <LuCircle />,
        name: "eCommerce",
      },
      {
        path: "/", // url
        icon: <LuCircle />, // icon component
        name: "CRM", // name that appear in Sidebar
      },
    ],
  },
  {
    path: "/", // url
    icon: <AiOutlineMail />, // icon component
    name: "Email", // name that appear in Sidebar
  },
  {
    path: "/app/transactions", // url
    icon: <BsChat />, // icon component
    name: "Chat", // name that appear in Sidebar
  },
  {
    path: "/app/charts", // url
    icon: <BsChat />, // icon component
    name: "Calender", // name that appear in Sidebar
  },
  {
    path: "/app/integration", // url
    icon: <BsChat />, // icon component
    name: "Invoice", // name that appear in Sidebar
  },
  {
    path: "/app/calendar", // url
    icon: <BsChat />, // icon component
    name: "User", // name that appear in Sidebar
  },

  {
    path: "", //no url needed as this has submenu
    icon: <BsChat />, // icon component
    name: "Role & Permission",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <BsChat />, // icon component
    name: "Pages",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <BsChat />, // icon component
    name: "Authentication",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <BsChat />, // icon component
    name: "Authentication",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <BsChat />, // icon component
    name: "Authentication",
  },
];

export default routes;
