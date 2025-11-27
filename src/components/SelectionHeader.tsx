import React from "react";

interface SelectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SelectionHeader: React.FC<SelectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div 
      className="
        w-full mb-14 text-center relative
        animate-[fadeIn_0.6s_ease-out]
      "
    >
      {/* Soft Glow Ring Behind */}
      <div
        className="
          absolute inset-0 mx-auto w-48 h-48 
 from-[#00C29A]/20 to-[#005c50]/20
          blur-3xl opacity-40
          pointer-events-none
        "
      />

      {/* Tiny Tag Above Title */}
      <div 
        className="
          inline-block px-4 py-1 mt-10
          text-xs tracking-wide uppercase font-chakra
          text-[#005c50] bg-[#00C29A]/10 
          rounded-full border border-[#00C29A]/20
          backdrop-blur-md
        "
      >
        Corol AI Materials Lab
      </div>

      {/* Main Title */}
      <h2
        className="
          text-4xl font-extrabold font-chakra
          text-[#0B2545] tracking-tight leading-tight mt-5
        "
      >
        {title}
      </h2>

      {/* Animated Subtitle */}
      {subtitle && (
        <p
          className="
            mt-3 text-lg font-chakra
            text-[#0B2545]/70 max-w-xl mx-auto
            animate-[slideUp_0.8s_ease-out]
          "
        >
          {subtitle}
        </p>
      )}

      {/* Divider Line */}
      <div
        className="
          mt-8 mx-auto w-24
           from-[#006A5B] to-[#00C29A]
          rounded-full
          animate-[growWidth_1.3s_ease-out]
        "
      />
    </div>
  );
};

export default SelectionHeader;