import React from "react";
import { FaCheck } from "react-icons/fa6";
function Features({ features }) {
  return (
    <div>
      {features ? (
        <div className="p-10 rounded-xl bg-white shadow-md mt-6">
          <h2 className="font-medium text-2xl">Features</h2>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(features).map(([features, value]) => (
              <div className="flex gap-2 items-center">
                <FaCheck className="p-1 bg-blue-100 text-lg text-primary rounded-full" />
                <h2>{features}</h2>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full mt-7 rounded-xl h-[250px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
}

export default Features;
