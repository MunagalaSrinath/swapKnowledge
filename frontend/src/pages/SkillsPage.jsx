// // 📄 src/pages/SkillsPage.jsx
// import { useState, useEffect, useCallback } from "react";
// import axios from "../api/axios";
// import { useAuth } from "../auth/AuthContext";

// const SkillsPage = () => {
//   const { token } = useAuth();
//   const [skills, setSkills] = useState([]);
//   const [title, setTitle] = useState("");
//   const [level, setLevel] = useState("");
//   const [description, setDescription] = useState("");

//   const fetchSkills = useCallback(async () => {
//     try {
//       const res = await axios.get("/skills", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSkills(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch skills");
//     }
//   }, [token]);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "/skills",
//         { title, level, description }, // ✅ include description
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setTitle("");
//       setLevel("");
//       setDescription(""); // ✅ reset description too
//       fetchSkills();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to add skill");
//     }
//   };

//   useEffect(() => {
//     fetchSkills();
//   }, [fetchSkills]);

//   return (
//     <div>
//       <h2>Your Skills</h2>
//       <form onSubmit={handleAdd}>
//         <input
//           type="text"
//           placeholder="Skill Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Level"
//           value={level}
//           onChange={(e) => setLevel(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />

//         <button type="submit">Add Skill</button>
//       </form>

//       <ul>
//         {skills.map((skill) => (
//           <li key={skill._id}>
//             {skill.title} ({skill.level})
//           </li>
//         ))}
//       </ul>
//       <ul>
//         {skills.map((skill) => (
//           <li key={skill._id}>
//             <strong>{skill.title}</strong> ({skill.level})<br />
//             <em>{skill.description}</em>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SkillsPage;

import { useState, useEffect, useCallback } from "react";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const SkillsPage = () => {
  const { token } = useAuth();
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");

  const fetchSkills = useCallback(async () => {
    try {
      const res = await axios.get("/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data);
      console.log("TOKEN:", token);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch skills");
    }
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/skills",
        { title, level, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setLevel("");
      setDescription("");
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add skill");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <div
      className="container py-5 bg-light"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8f9fa, #e3f2fd)",
      }}
    >
      <div className="card shadow-lg p-5 rounded-4">
        <h3 className="mb-4 text-center text-info">Your Skills</h3>
        <form onSubmit={handleAdd} className="mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Skill Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-3 text-end">
            <button className="btn btn-info text-white" type="submit">
              Add Skill
            </button>
          </div>
        </form>

        <ul className="list-group">
          {skills.map((skill) => (
            <li key={skill._id} className="list-group-item">
              <h5 className="mb-1">
                {skill.title}{" "}
                <span className="badge bg-secondary">{skill.level}</span>
              </h5>
              <p className="mb-0 text-muted">{skill.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillsPage;
