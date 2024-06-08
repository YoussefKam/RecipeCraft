import RemoveItem from "../../assets/remove-item.svg";
import ReOrderItem from "../../assets/reorder-item.svg";

const Ingredients = ({
  ingredientInputs,
  handleChange,
  handleAddInput,
  deleteIngredients,
}) => {
  return (
    <div>
      {ingredientInputs?.map((ingredient, index) => (
        <div className="flex justify-between items-center mt-8" key={index}>
          <div className="flex">
            <img
              src={ReOrderItem}
              alt="reorder-item-img"
              width={35}
              height={35}
            />
            <input
              type="text"
              className="lg:w-[34.87rem] w-[14rem] p-3 border bg-[#FBFBFB] rounded-lg ml-5"
              placeholder="Item"
              value={ingredient}
              name={`ingredients`}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
          <div>
            <img
              src={RemoveItem}
              width={35}
              height={35}
              alt="remove-item-img"
              onClick={()=>deleteIngredients(index)}
              className="cursor-pointer ml-8 mr-2 lg:ml-0"
            />
          </div>
        </div>
      ))}
      <button onClick={handleAddInput} type="button" className="mt-8">
        <p className="lg:text-[24px] text-[18px] font-medium">+ Add Ingredient</p>
      </button>
    </div>
  );
};

export default Ingredients;
