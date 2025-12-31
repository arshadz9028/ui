// "use client";

// import useSWR from "swr";
// import { useState } from "react";
// import Spinner from "../components/Spinner";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function HomePage() {
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 50;

//   const { data, isLoading } = useSWR(
//     query.length > 1
//       ? `/api/search?q=${query}&page=${page}&limit=${limit}`
//       : null,
//     fetcher
//   );

//   const results = data?.results || [];
//   const total = data?.total || 0;
//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
//       <h2 style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "600", color: "#222" }}>Voter Search</h2>

//       <input
//         type="text"
//         placeholder="Search by voter ID, name, address, father name..."
//         value={query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           setPage(1);
//         }}
//         style={{
//           width: "100%",
//           padding: "12px",
//           fontSize: "17px",
//           borderRadius: "6px",
//           border: "1px solid #ccc",
//           marginBottom: "10px",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
//           transition: "all 0.3s ease",
//           boxSizing: "border-box"
//         }}
//         onFocus={(e) => (e.target.style.borderColor = "#333")}
//         onBlur={(e) => (e.target.style.borderColor = "#ccc")}
//       />

//       {isLoading && query && <Spinner />}

//       {query && total > 0 && (
//         <p style={{ fontSize: "14px", color: "#555", marginBottom: "15px" }}>
//           Showing {Math.min((page - 1) * limit + 1, total)} to {Math.min(page * limit, total)} of {total} results  
//         </p>
//       )}

//       {/* RESULTS */}
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         {results.map((item) => (
//           <div
//             key={item._id}
//             style={{
//               padding: "14px",
//               borderRadius: "8px",
//               border: "1px solid #ddd",
//               background: "#fafafa",
//               boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
//               transition: "all 0.2s ease"
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)";
//               e.currentTarget.style.transform = "translateY(-2px)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
//               e.currentTarget.style.transform = "translateY(0)";
//             }}
//           >
//             <div style={{ marginBottom: "8px" }}><strong>Name:</strong> {item.name_original}</div>
//             <div style={{ marginBottom: "8px" }}><strong>Father/Husband:</strong> {item.father_or_husband_original}</div>
//             <div style={{ marginBottom: "8px" }}><strong>Voter ID:</strong> {item.voter_id}</div>
//             <div style={{ marginBottom: "8px" }}><strong>Address:</strong> {item.address_original}</div>
//             <div style={{ marginBottom: "8px" }}><strong>Ward:</strong> {item.ward}</div>
//             <div style={{ marginBottom: "8px" }}><strong>Page:</strong> {item.page}</div>
//             <div style={{ marginBottom: "8px" }}><strong>File:</strong> {item.file_name}</div>
//             <div><strong>Source line:</strong> {item._raw_line}</div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {total > limit && (
//         <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px", gap: "10px" }}>
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page <= 1}
//             style={{
//               padding: "10px 18px",
//               borderRadius: "6px",
//               fontSize: "15px",
//               background: page <= 1 ? "#ddd" : "#333",
//               color: "#fff",
//               border: "none",
//               cursor: page <= 1 ? "default" : "pointer",
//               transition: "all 0.2s ease",
//               fontWeight: "500"
//             }}
//             onMouseEnter={(e) => {
//               if (page > 1) e.target.style.background = "#555";
//             }}
//             onMouseLeave={(e) => {
//               if (page > 1) e.target.style.background = "#333";
//             }}
//           >
//             Previous
//           </button>

//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page >= totalPages}
//             style={{
//               padding: "10px 18px",
//               borderRadius: "6px",
//               fontSize: "15px",
//               background: page >= totalPages ? "#ddd" : "#333",
//               color: "#fff",
//               border: "none",
//               cursor: page >= totalPages ? "default" : "pointer",
//               transition: "all 0.2s ease",
//               fontWeight: "500"
//             }}
//             onMouseEnter={(e) => {
//               if (page < totalPages) e.target.style.background = "#555";
//             }}
//             onMouseLeave={(e) => {
//               if (page < totalPages) e.target.style.background = "#333";
//             }}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import React from 'react'

function page() {
  return (
    <div>Temporary unavailable</div>
  )
}

export default page