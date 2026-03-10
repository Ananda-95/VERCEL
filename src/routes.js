import React, {lazy} from "react";
import folderData from "./data/folderData.json"; // import JSON first
import reactFile from "./data/reactFile.json"
const Home = lazy(()=>import("./components/Home"));
const TreeView1 = lazy(()=>import("./components/TreeView1"));
const TreeView2 = lazy(()=>import("./components/TreeView2"));
const TaskManager= lazy(()=>import("./components/taskManager/TaskManager"));
const route = [
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/treeView1",
    element:<TreeView1 data={folderData} />
  },
  {
    path:"/treeView2",
    element:<TreeView2 data={reactFile} />
  },
  {
    path:"/taskManager",
    element:<TaskManager />
  }

]

export default route;
