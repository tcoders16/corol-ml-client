
import "../App.css";

export default function AILoader() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="neon-loader"></div>
      <p className="text-[#00916E] mt-4 text-lg font-semibold animate-pulse">
        Processing through Corol AI Engine…
      </p>
    </div>
  );
}