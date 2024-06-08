import { useState } from "react";
import RemoveItem from "../../assets/remove-item.svg";
import ReOrderItem from "../../assets/reorder-item.svg";

const RecipeSteps = ({
  stepsInput,
  handleChange,
  handleAddInput,
  deleteSteps,
}) => {
  return (
    <div>
      {stepsInput?.map((step, index) => (
        <div className="flex justify-between items-center mt-8" key={index}>
          <div className="flex">
            <img
              src={ReOrderItem}
              alt="reorde-item-img"
              width={35}
              height={35}
              className="mt-10"
            />
            <div>
              <p className="text-[22px] p-3 ml-2">Step {index + 1}</p>
              <textarea
                type="text"
                value={step}
                name="instructions"
                className="w-[63.25rem] p-3 border bg-[#FBFBFB] rounded-lg ml-5 h-28"
                placeholder="Input Text"
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          </div>
          <div>
            <img
              src={RemoveItem}
              width={45}
              height={45}
              alt="remove-item-img"
              onClick={deleteSteps}

            />
          </div>
        </div>
      ))}
      <button onClick={handleAddInput} type="button" className="mt-8">
        <p className="text-[24px] font-medium">+ Add Step</p>
      </button>
    </div>
  );
};

export default RecipeSteps;
