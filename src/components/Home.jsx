import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";


const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteID = searchParams.get("pasteID");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
      if(pasteID){
        const paste = allPastes.find((p) => p._id === pasteID);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteID])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteID || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteID) {
      // upDate
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row place-content-around p-2">
        <input
          className="border rounded-[7px] p-1"
          type="text"
          name=""
          id=""
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste}>
          {pasteID ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="p-4">
        <textarea
          type="text"
          className="border rounded-[7px]
        p-2
        min-w-[500px]"
          placeholder="Enter your content"
          value={value}
          rows={20}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
