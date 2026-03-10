import React, { useState } from "react";

// TreeNode component
const TreeNode = ({ name, data }) => {
  const [open, setOpen] = useState(false);

  const isFile = !data || (typeof data === "object" && Object.keys(data).length === 0);

  if (isFile) {
    return (
      <div style={{ paddingLeft: "20px" }}>
        📄 {name}
      </div>
    );
  }

  // It's a folder
  const entries = Object.entries(data);

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
          <div
            style={{ paddingLeft: "20px", fontStyle: "italic", color: "#888" }}
          >
            (empty)
          </div>
        ))}
    </div>
  );
};

// TreeView component
export default function Example1({ data }) {
  const entries = data && typeof data === "object" ? Object.entries(data) : [];

  return (
    <>
      {entries.map(([key, value]) => (
        <TreeNode key={key} name={key} data={value} />
      ))}
    </>
  );
}
