// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { useAuth } from "../auth/AuthContext";

// const CreateSwapPage = () => {
//   const { token, user } = useAuth(); // ✅ token + user
//   const [mySkills, setMySkills] = useState([]);
//   const [otherSkills, setOtherSkills] = useState([]);
//   //const [toUser, setToUser] = useState("");
//   const [offeredSkill, setOfferedSkill] = useState("");
//   const [requestedSkill, setRequestedSkill] = useState("");

//   // ✅ Fetch skills from server
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const res = await axios.get("/skills", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const allSkills = res.data;
//         const my = allSkills.filter((s) => s.user._id === user._id);
//         const others = allSkills.filter((s) => s.user._id !== user._id);

//         setMySkills(my);
//         setOtherSkills(others);
//       } catch (err) {
//         console.error("Failed to fetch skills:", err);
//         alert("Failed to fetch skills");
//       }
//     };

//     fetchSkills();
//   }, [token, user]);

//   // ✅ Form submission logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const selectedSkill = otherSkills.find((s) => s._id === requestedSkill);
//       const targetUserId = selectedSkill?.user?._id;

//       if (!targetUserId) {
//         return alert("Please select a valid skill to request");
//       }

//       await axios.post(
//         "/swaps",
//         {
//           toUser: targetUserId,
//           offeredSkill,
//           requestedSkill,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Swap request sent!");
//     } catch (err) {
//       console.error("Swap request failed:", err);
//       alert("Failed to send swap request");
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="card shadow p-4">
//         <h3 className="text-center mb-4">Request a Skill Swap</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Your Skill to Offer:</label>
//             <select
//               className="form-select"
//               value={offeredSkill}
//               onChange={(e) => setOfferedSkill(e.target.value)}
//               required
//             >
//               <option value="">-- Select --</option>
//               {mySkills.map((skill) => (
//                 <option key={skill._id} value={skill._id}>
//                   {skill.title} ({skill.level})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Skill You Want:</label>
//             <select
//               className="form-select"
//               value={requestedSkill}
//               onChange={(e) => setRequestedSkill(e.target.value)}
//               required
//             >
//               <option value="">-- Select --</option>
//               {otherSkills.map((skill) => (
//                 <option key={skill._id} value={skill._id}>
//                   {skill.title} by {skill.user?.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button className="btn btn-success w-100" type="submit">
//             Send Swap Request
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateSwapPage;
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const CreateSwapPage = () => {
  const { token, user } = useAuth();
  const [mySkills, setMySkills] = useState([]);
  const [otherSkills, setOtherSkills] = useState([]);
  const [offeredSkill, setOfferedSkill] = useState("");
  const [requestedSkill, setRequestedSkill] = useState("");

  // useEffect(() => {
  //   const fetchSkills = async () => {
  //     try {
  //       const res = await axios.get("/skills", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const allSkills = res.data;

  //       const my = allSkills.filter((s) => s.user._id === user._id);
  //       const others = allSkills.filter((s) => s.user._id !== user._id);

  //       setMySkills(my);
  //       setOtherSkills(others);
  //     } catch (err) {
  //       console.error("Failed to fetch skills:", err);
  //       alert("Failed to fetch skills");
  //     }
  //   };

  //   if (token && user) fetchSkills();
  // }, [token, user]);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        console.log("🟡 Token used in request:", token);

        const res = await axios.get("/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("🟢 Skills fetched:", res.data);

        const allSkills = res.data;
        const my = allSkills.filter((s) => s.user._id === user._id);
        const others = allSkills.filter((s) => s.user._id !== user._id);

        console.log("🧑‍🎓 My Skills:", my);
        console.log("🌍 Other Skills:", others);

        setMySkills(my);
        setOtherSkills(others);
        console.log("TOKEN at CreateSwapPage:", token);
        console.log("USER at CreateSwapPage:", user);
      } catch (err) {
        console.error("❌ Failed to fetch skills:", err);
        alert("Failed to fetch skills");
      }
    };

    fetchSkills();
  }, [token, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedSkill = otherSkills.find((s) => s._id === requestedSkill);
      const targetUserId = selectedSkill?.user?._id;

      if (!targetUserId) {
        return alert("Please select a valid skill to request");
      }

      await axios.post(
        "/swaps",
        {
          toUser: targetUserId,
          offeredSkill,
          requestedSkill,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Swap request sent!");
      setOfferedSkill("");
      setRequestedSkill("");
    } catch (err) {
      console.error("Swap request failed:", err);
      alert("Failed to send swap request");
    }
  };

  if (!token || !user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Request a Skill Swap</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Your Skill to Offer:</label>
            <select
              className="form-select"
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {mySkills.map((skill) => (
                <option key={skill._id} value={skill._id}>
                  {skill.title} ({skill.level})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Skill You Want:</label>
            <select
              className="form-select"
              value={requestedSkill}
              onChange={(e) => setRequestedSkill(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {otherSkills.map((skill) => (
                <option key={skill._id} value={skill._id}>
                  {skill.title} by {skill.user?.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-success w-100" type="submit">
            Send Swap Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSwapPage;
