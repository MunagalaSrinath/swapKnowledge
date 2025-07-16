// import { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
// // import { useAuth } from "../auth/UseAuth";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/login", { email, password });
//       login(res.data.token, res.data.user);
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
// 📄 src/pages/LoginPage.jsx
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });

      console.log("✅ Login API Response:");
      console.log("Token:", res.data.token);
      console.log("User:", res.data.user);

      login(res.data.token, res.data.user);

      console.log("✅ Stored token in context:", localStorage.getItem("token"));
      console.log("✅ After login, navigating to homepage...");

      navigate("/");
    } catch (err) {
      console.error("❌ Login failed:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center bg-light"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #ffffff)",
      }}
    >
      <div
        className="card shadow-lg p-5 rounded-4 w-100"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="mb-4 text-center text-primary">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
