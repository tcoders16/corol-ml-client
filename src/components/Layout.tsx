import React, { ReactNode } from "react";

import ConstructionNotice from "./ConstructionNotice";



interface LayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}


export default function Layout({ title, subtitle, children }: LayoutProps) {
  return (
    <>
      <ConstructionNotice />

      <div className="pt-16 min-h-screen w-full  from-[#F3F7FA] to-[#E9EEF2] py-14 px-6 flex flex-col items-center">
        <header className="w-full max-w-5xl bg-white/60 backdrop-blur-xl shadow-xl border border-white/30 rounded-2xl p-10 mb-12">
          <h1 className="text-4xl font-extrabold text-[#0B2545] tracking-tight font-chakra">
            {title}
          </h1>

          {subtitle && (
            <p className="text-[#006A5B] mt-2 font-medium text-lg font-chakra">
              {subtitle}
            </p>
          )}
        </header>

        <main className="w-full max-w-5xl">{children}</main>
      </div>
    </>
  );
}