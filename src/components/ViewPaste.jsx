import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="p-4 text-center text-gray-500">Paste not found.</div>
    );
  }

  return (
    <div>
      <div className="flex flex-row place-content-around p-2">
        <input
          className="border rounded-[7px] p-1"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              paste?.content || "No content available"
            );
            toast.success("Copied to clipboard");
          }}
        >Copy</button>
      </div>

      <div className="p-4">
        <textarea
          className="border rounded-[7px] p-2 min-w-[500px]"
          value={paste.content}
          placeholder="Enter your content here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
