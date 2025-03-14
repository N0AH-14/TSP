import React, { useState } from "react";

const TagDetails = ({ tagData = { tag_names: [], event_name: "" }, setTagData, handleFinalSubmit }) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tagData.tag_names.includes(tagInput.trim())) {
      setTagData((prev) => ({
        ...prev,
        tag_names: [...prev.tag_names, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTagData((prev) => ({
      ...prev,
      tag_names: prev.tag_names.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#7b2b41]">Tag Details</h2>
      <input
        type="text"
        placeholder="Event Name"
        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
        value={tagData.event_name}
        onChange={(e) => setTagData({ ...tagData, event_name: e.target.value })}
        required
      />
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Tag Name"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7b2b41]"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button 
          onClick={addTag} 
          className="ml-2 p-3 bg-[#7b2b41] text-white rounded-lg hover:bg-[#9c4e64] transition"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap mt-2">
        {tagData.tag_names?.map((tag, index) => (
          <div key={index} className="flex items-center bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2">
            <span>{tag}</span>
            <button 
              className="ml-2 text-red-500" 
              onClick={() => removeTag(tag)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleFinalSubmit} className="w-full p-3 bg-[#7b2b41] text-white rounded-lg hover:bg-[#9c4e64] transition">
        Submit
      </button>
    </div>
  );
};

export default TagDetails;
