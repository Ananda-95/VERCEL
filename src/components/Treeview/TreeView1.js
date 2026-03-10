import React, { useState } from "react";

const TreeNode = ({ name, data }) => {
  const [open, setOpen] = useState(false);

  // If data is "file", render as file
  if (data === "file") {
    return (
      <div style={{ paddingLeft: "20px" }}>
        📄 {name}
      </div>
    );
  }

  // Treat null, undefined, or non-object as empty folder
  const entries =
    data && typeof data === "object" ? Object.entries(data) : [];

  return (
    <div style={{ paddingLeft: "20px" }}>
      <div
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => setOpen(!open)}
      >
        {open ? "📂 -" : "📁 +"} {name}
      </div>

      {open &&
        (entries.length > 0 ? (
          entries.map(([key, value]) => (
            <TreeNode key={key} name={key} data={value} />
          ))
        ) : (
          <div style={{ paddingLeft: "20px", fontStyle: "italic", color: "#888" }}>
            (empty)
          </div>
        ))}
    </div>
  );
};

export default function TreeView({ data }) {
  // Fallback to empty object if data is null/undefined
  const entries =
    data && typeof data === "object" ? Object.entries(data) : [];

  return (
    <>
      {entries.map(([key, value]) => (
        <TreeNode key={key} name={key} data={value} />
      ))}
    </>
  );
}
