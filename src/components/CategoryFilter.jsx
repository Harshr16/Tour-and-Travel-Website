import React from "react";

const categories = ["all", "beach", "nature", "adventure", "religion"];

const CategoryFilter = ({ selectedCategory, setCategory }) => {
  return (
    <div className="flex gap-4 mt-6 flex-wrap justify-center">
      {categories.map((key) => (
        <button
          key={key}
          onClick={() => setCategory(key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === key ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
          } hover:bg-orange-400`}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
