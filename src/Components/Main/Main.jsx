// import './Main.css';
// import Navbar from '../Navbar/Navbar';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { FiMoreVertical } from "react-icons/fi";

// const Main = () => {
//   const [tasks, setTasks] = useState([]);
//   const [openMenu, setOpenMenu] = useState(null);

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/tasks");
//       setTasks(res.data);
//       console.log("Tasks from backend:", res.data);
//     } catch (err) {
//       console.error("Failed to fetch tasks:", err);
//     }
//   };

//   const deleteTask = async (id) => {
//     console.log("Deleting task with id:", id);
//     if (!id) return alert("Task ID missing!");
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       setOpenMenu(null);
//       fetchTasks();
//     } catch (err) {
//       alert("Error deleting task");
//       console.error(err);
//     }
//   };

//   const markAsDone = async (id) => {
//     console.log("Marking as done ID:", id);
//     if (!id) return alert("Task ID missing!");
//     try {
//       await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: "done" });
//       setOpenMenu(null);
//       fetchTasks();
//     } catch (err) {
//       alert("Error marking task as done");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="main">
//       <Navbar />
//       <div className="main-center">
//         {tasks.length === 0 ? (
//           <>
//             <p><span>You don't have any tasks yet</span></p>
//             <p>Click on the <span>+</span> button to add one</p>
//           </>
//         ) : (
//           <ul className="task-list">
//             {tasks.map((task) => (
//               <li key={task.id} className="tacard">
//                 <div className="tacard-header">
//                   <h3>{task.title}</h3>
//                   <div className="task-options">
//                     <FiMoreVertical
//                       className="options-icon"
//                       onClick={() => setOpenMenu(openMenu === task.id ? null : task.id)}
//                     />
//                     {openMenu === task.id && (
//                       <div className="dropdown-menu">
//                         {task.status !== "done" && (
//                           <button onClick={() => markAsDone(task.id)}>
//                             ✅ Mark as done
//                           </button>
//                         )}
//                         <button onClick={() => deleteTask(task.id)}>
//                           🗑 Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <p className="task-description">{task.description}</p>
//                 <p className="task-meta">
//                   ⏱ {task.dueDate?.slice(0, 10)} •{" "}
//                   {task.status === "done" ? (
//                     <span style={{ color: "lightgreen" }}>Completed ✅</span>
//                   ) : (
//                     <span style={{ color: "red" }}>Not completed</span>
//                   )}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="listbtn">
//         <Link to="/addtask">
//           <button className="list-btn">+</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Main;


import './Main.css';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { db } from '../../firebase'; // adjust path if needed
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  or
} from 'firebase/firestore';
import { useAuth } from '../../AuthContext'; // adjust path

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      const q = query(
        collection(db, 'tasks'),
        or(
          where('owner', '==', user.email),
          where('sharedWith', 'array-contains', user.email)
        )
      );
      const snapshot = await getDocs(q);
      const fetchedTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(fetchedTasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const deleteTask = async (id) => {
    if (!id) return alert("Task ID missing!");
    try {
      await deleteDoc(doc(db, "tasks", id));
      setOpenMenu(null);
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
      console.error(err);
    }
  };

  const markAsDone = async (id) => {
    if (!id) return alert("Task ID missing!");
    try {
      await updateDoc(doc(db, "tasks", id), { status: "done" });
      setOpenMenu(null);
      fetchTasks();
    } catch (err) {
      alert("Error marking task as done");
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div className="main">
      <Navbar />
      <div className="main-center">
        {tasks.length === 0 ? (
          <>
            <p><span>You don't have any tasks yet</span></p>
            <p>Click on the <span>+</span> button to add one</p>
          </>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="tacard">
                <div className="tacard-header">
                  <h3>{task.title}</h3>
                  <div className="task-options">
                    <FiMoreVertical
                      className="options-icon"
                      onClick={() => setOpenMenu(openMenu === task.id ? null : task.id)}
                    />
                    {openMenu === task.id && (
                      <div className="dropdown-menu">
                        {task.status !== "done" && (
                          <button onClick={() => markAsDone(task.id)}>
                            ✅ Mark as done
                          </button>
                        )}
                        {task.owner === user.email && (
                          <button onClick={() => deleteTask(task.id)}>
                            🗑 Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <p className="task-description">{task.description}</p>
                <p className="task-meta">
                  ⏱ {task.dueDate?.slice(0, 10)} •{" "}
                  {task.status === "done" ? (
                    <span style={{ color: "lightgreen" }}>Completed ✅</span>
                  ) : (
                    <span style={{ color: "red" }}>Not completed</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="listbtn">
        <Link to="/addtask">
          <button className="list-btn">+</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
