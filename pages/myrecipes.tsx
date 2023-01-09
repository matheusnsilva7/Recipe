import { useState, useEffect } from "react";
import Form from "../components/Form";
import Head from 'next/head'

import classes from "../styles/myrecipes.module.css";

interface myRecipes {
  id: number;
  title: string;
  servings: number;
  cooking_time: number;
  ingredients1: string;
  ingredients2: string;
  ingredients3: string;
  ingredients4: string;
  ingredients5: string;
}

const myrecipe = () => {
  const [newRecipe, setNewRecipe] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<myRecipes[]>([]);

  useEffect(() => {
    localStorage.getItem("myrecipes") &&
      setRecipes(JSON.parse(localStorage.getItem("myrecipes") || "[]"));
  }, []);

  const updaterecipe = (recipe: myRecipes) => {
    recipe &&
      setRecipes((prev) => {
        return [...prev, recipe];
      });
    setNewRecipe(false);
  };

  const removeHandler = (elemId: number) => {
    setRecipes((prev) => prev.filter(({ id }) => id !== elemId));
    localStorage.setItem(
      "myrecipes",
      JSON.stringify(recipes.filter(({ id }) => id !== elemId))
    );
  };
  return (
    <div className={classes.container}>
      <Head>
        <title>Recipes - My recipes</title>
      </Head>
      <h3>MY RECIPES</h3>
      <button onClick={() => setNewRecipe(true)}>ADD NEW RECIPE</button>
      {newRecipe && (
        <Form recipes={recipes} newRecipe={updaterecipe} form={setNewRecipe} />
      )}
      <div className={classes.containerRecipes}>
        {recipes.length > 0 ? (
          recipes.map(
            ({
              id,
              title,
              servings,
              cooking_time,
              ingredients1,
              ingredients2,
              ingredients3,
              ingredients4,
              ingredients5,
            }) => {
              return (
                <div key={id}>
                  <div
                    className={classes.exit}
                    onClick={removeHandler.bind(null, id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                    >
                      <path d="M8.396 13.521 10 11.917l1.604 1.604 1.417-1.417-1.604-1.604 1.604-1.604-1.417-1.417L10 9.083 8.396 7.479 6.979 8.896 8.583 10.5l-1.604 1.604Zm-2.125 4.187q-1.042 0-1.75-.708-.709-.708-.709-1.75V5.729H2.333V3.271h5.188V1.792h4.917v1.479h5.229v2.458h-1.479v9.521q0 1.042-.709 1.75-.708.708-1.75.708Z" />
                    </svg>
                  </div>
                  <h3>{title}</h3>
                  <h4>
                    <span>{servings}</span> SERVINGS
                  </h4>
                  <h4>
                    <span>{cooking_time}</span> MINUTES
                  </h4>
                  <h4>Ingredients</h4>
                  {ingredients1 && <h5>{ingredients1}</h5>}
                  {ingredients2 && <h5>{ingredients2}</h5>}
                  {ingredients3 && <h5>{ingredients3}</h5>}
                  {ingredients4 && <h5>{ingredients4}</h5>}
                  {ingredients5 && <h5>{ingredients5}</h5>}
                </div>
              );
            }
          )
        ) : (
          <p className={classes.error}>no recipe found!</p>
        )}
      </div>
    </div>
  );
};

export default myrecipe;
