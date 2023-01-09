import React, { SetStateAction, useRef } from "react";
import classes from "./Form.module.css";

interface myRecipes {
  id?: number;
  title?: string;
  servings?: number;
  cooking_time?: number;
  ingredients1?: string;
  ingredients2?: string;
  ingredients3?: string;
  ingredients4?: string;
  ingredients5?: string;
}

interface props {
  recipes: myRecipes[];
  form: React.Dispatch<SetStateAction<boolean>>;
  newRecipe: (recipe: any) => void;
}

const Form = ({ recipes, newRecipe, form }: props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = new FormData(e.target as any);
    const data = { ...Object.fromEntries(value), id: Math.random() };
    localStorage.setItem("myrecipes", JSON.stringify([...recipes, data]));
    newRecipe(data);
    form(false);
  };
  return (
    <div className={classes.container}>
      <div onClick={() => form(false)}></div>
      <form ref={formRef} onSubmit={submitForm}>
        <label className={classes.title}>New Recipe</label>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="prepTime">Prep time</label>
        <input type="number" id="prepTime" name="cooking_time" required />
        <label htmlFor="servings">Servings</label>
        <input type="number" id="servings" name="servings" required />
        <label htmlFor="Ingredient1">Ingredient</label>
        <input
          type="text"
          id="Ingredient1"
          placeholder="Quantity Unit Description"
          name="ingredients1"
          required
        />
        <label htmlFor="Ingredient2">Ingredient</label>
        <input
          type="text"
          id="Ingredient2"
          placeholder="Quantity Unit Description"
          name="ingredients2"
        />
        <label htmlFor="Ingredient3">Ingredient</label>
        <input
          type="text"
          id="Ingredient3"
          placeholder="Quantity Unit Description"
          name="ingredients3"
        />
        <label htmlFor="Ingredient4">Ingredient</label>
        <input
          type="text"
          id="Ingredient4"
          name="ingredients4"
          placeholder="Quantity Unit Description"
        />
        <label htmlFor="Ingredient5">Ingredient</label>
        <input
          type="text"
          id="Ingredient5"
          name="ingredients5"
          placeholder="Quantity Unit Description"
        />
        <button>ADD RECIPE</button>
      </form>
    </div>
  );
};

export default Form;
