// // import { useAuth } from "../auth/AuthContext";
// // import { Link } from "react-router-dom";

// // const Dashboard = () => {
// //   const { user, logout } = useAuth();
// //   return (
// //     <div>
// //       <h2>Welcome, {user?.name}</h2>
// //       <p>Email: {user?.email}</p>

// //       <nav>
// //         <Link to="/skills">My Skills</Link> |{" "}
// //         <Link to="/swaps">Swap Requests</Link>
// //       </nav>

// //       <br />
// //       <button onClick={logout}>Logout</button>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // 📄 src/pages/Dashboard.jsx (with Tailwind UI Enhancements)
// import { useAuth } from "../auth/AuthContext";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   return (
//     <div className="p-6">
//       <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg mb-6">
//         <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.name}!</h2>
//         <p className="text-sm">Ready to continue your skill-sharing journey?</p>
//         <Link
//           to="/skills"
//           className="mt-4 inline-block bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-100 font-semibold"
//         >
//           Discover New Skills →
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white shadow p-4 rounded-2xl text-center">
//           <p className="text-xl font-bold">5.0</p>
//           <p className="text-sm text-gray-500">Rating</p>
//         </div>
//         <div className="bg-white shadow p-4 rounded-2xl text-center">
//           <p className="text-xl font-bold">0</p>
//           <p className="text-sm text-gray-500">Completed Swaps</p>
//         </div>
//         <div className="bg-white shadow p-4 rounded-2xl text-center">
//           <p className="text-xl font-bold">0</p>
//           <p className="text-sm text-gray-500">Pending Requests</p>
//         </div>
//         <div className="bg-white shadow p-4 rounded-2xl text-center">
//           <p className="text-xl font-bold">6</p>
//           <p className="text-sm text-gray-500">Active Users</p>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div className="bg-white p-4 rounded-2xl shadow">
//           <h3 className="font-semibold mb-2">Your Skills</h3>
//           <p className="text-sm text-gray-500">Skills You Offer & Want</p>
//           <Link
//             to="/profile"
//             className="text-blue-600 hover:underline text-sm mt-2 inline-block"
//           >
//             Edit Profile →
//           </Link>
//         </div>
//         <div className="bg-white p-4 rounded-2xl shadow">
//           <h3 className="font-semibold mb-2">Recent Activity</h3>
//           <p className="text-sm text-gray-500">No recent activity</p>
//           <Link
//             to="/swaps"
//             className="text-blue-600 hover:underline text-sm mt-2 inline-block"
//           >
//             View All Swaps →
//           </Link>
//         </div>
//       </div>

//       <div className="mt-8 text-right">
//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// 📄 src/pages/Dashboard.jsx
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">Welcome, {user?.name}</h2>
        <p className="text-muted mb-4">Email: {user?.email}</p>

        <nav className="mb-4">
          <Link to="/skills" className="btn btn-outline-primary me-2">
            My Skills
          </Link>
          <Link to="/swaps" className="btn btn-outline-secondary">
            Swap Requests
          </Link>
        </nav>

        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
