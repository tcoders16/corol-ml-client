import { useState, useEffect } from "react";

export default function ConstructionNotice() {
  const [visible, setVisible] = useState(true);

  // Load persisted state
  useEffect(() => {
    const hide = localStorage.getItem("hideNoticeBar");
    if (hide === "true") setVisible(true);
  }, []);

  // Hide + persist
  function closeBar() {
    setVisible(false);
    localStorage.setItem("hideNoticeBar", "true");
  }

  if (!visible) return null;

  return (
    <div
      className="
        w-full  top-0 left-0 z-50
        bg-[#FFF7D1]/95 backdrop-blur-md
        border-b border-yellow-700 
        text-yellow-900 font-chakra text-lg md:text-base
        py-2 px-4 flex items-center justify-center relative
        animate-[slideDown_0.5s_ease-out]
      "
    >
      <span>
        ⚠️ The Corol AI Lab is under active development. Features are incomplete,
        and this environment is not secured yet. Do NOT upload sensitive or real production data.
      </span>

      {/* Close Button */}
      <button
        onClick={closeBar}
        className="
          absolute right-4 top-1/2 -translate-y-1/2 
          text-yellow-800 hover:text-yellow-400
          font-bold text-lg px-2
        "
      >
        ×
      </button>
    </div>
  );
}