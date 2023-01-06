import Link from "next/link";
import { useEffect, useState } from "react";

import classes from "../styles/recipes.module.css";

interface ObjRecipe {
    cooking_time?: number;
    id?: string;
    image_url?: string;
    ingredients?: { quantity?: number; unit?: string; description?: string }[];
    publisher?: string;
    servings?: number;
    source_url?: string;
    title?: string;
  }
  
const favoritesrecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    localStorage.getItem("favorite") &&
      setRecipes(JSON.parse(localStorage.getItem("favorite") || "[]"));
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.recipeContainer}>
        {recipes.length > 0 ? (
          recipes.slice((page - 1) * 6, page * 6).map((elem: any) => {
            return (
              <Link
                href={`/recipe/${elem.id}`}
                className={
                  classes.recipe +
                  " " +
                  (JSON.parse(localStorage.getItem("favorite") || "[]")?.some(
                    (a: ObjRecipe) => a.id === elem.id
                  ) && classes.favorite)
                }
                key={elem.id}
              >
                <img src={elem["image_url"]} />
                <h4>{elem.title}</h4>
                <h5>{elem.publisher}</h5>
              </Link>
            );
          })
        ) : (
          <p className={classes.error}>no recipe found!</p>
        )}
      </div>
      <div className={classes.page}>
        <>
          {page > 1 && (
            <div onClick={() => setPage((prev) => (prev -= 1))}>
              previous page
            </div>
          )}
          {Math.floor(recipes.length / 6) >= page && (
            <div
              className={classes.next}
              onClick={() => setPage((prev) => (prev += 1))}
            >
              Next Page
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default favoritesrecipe;
