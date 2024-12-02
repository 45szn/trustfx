"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Handle unauthenticated user case
  }

  return (
    <div>
      <h1 className="text-xl font-bold">
        Welcome {user.displayName || user.email}!
      </h1>
    </div>
  );
};

export default Dashboard;



// "use client";
// import React from "react";
// import useAuth from "@/hooks/useAuth";

// const Dashboard = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return null; // Or handle this case differently, e.g., redirect
//   }

//   return (
//     <div>
//       <h1 className="text-xl font-bold">Welcome {user.email}!</h1>
//     </div>
//   );
// };

// export default Dashboard;
