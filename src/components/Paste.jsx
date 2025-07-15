import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDetele(pasteID) {
    dispatch(removeFromPaste(pasteID));
  }

  return (
    <div className="p-1">
      <input
        className="border rounded-[7px] p-1 "
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 p-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="flex flex-col gap-2 border rounded-[7px]"
                key={paste?._id}
              >
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-1.5 place-content-evenly p-2">
                  <button>
                    <a href={`/?pasteID=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button onClick={() => handleDetele(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        paste?.content || "No content available"
                      );
                      toast.success("Copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button>Share</button>
                </div>
                <div>
                  {new Date(paste.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
