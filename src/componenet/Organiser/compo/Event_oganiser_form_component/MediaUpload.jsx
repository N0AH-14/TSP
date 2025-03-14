import React from "react";

const MediaUpload = ({ mediaData, setMediaData, setStep }) => {
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaData((prev) => ({ ...prev, mediaFiles: files }));
  };

  const handleTypeChange = (e) => {
    setMediaData((prev) => ({ ...prev, type: e.target.value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#7b2b41]">Media Upload</h2>

      {/* Dropdown for media type selection */}
      <select
        value={mediaData.type}
        onChange={handleTypeChange}
        className="block w-full border border-gray-300 rounded-lg p-3"
      >
        <option value="" disabled>Select Media Type</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="poster">Poster</option>
      </select>

      <input
        type="file"
        multiple
        onChange={handleMediaChange}
        className="block w-full border border-gray-300 rounded-lg p-3"
      />

      <button
        onClick={() => setStep(3)}
        className="w-full p-3 bg-[#7b2b41] text-white rounded-lg hover:bg-[#9c4e64] transition"
      >
        Next
      </button>
    </div>
  );
};

export default MediaUpload;
