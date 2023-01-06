import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";

import classes from "../../styles/recipe.module.css";

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

const recipe = () => {
  const [recipes, setRecipes] = useState<ObjRecipe>({});
  const [favorite, setFavorite] = useState<ObjRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.recipeId !== undefined)
      fetchRecipesHandler(router.query.recipeId);
    if (error) setError(false);
    if (Object.keys(recipe).length !== 0) setRecipes({});
    if (!isLoading) setIsLoading(true);
    localStorage.getItem("favorite") && setFavorite(JSON.parse(localStorage.getItem("favorite") || "[]"));
  }, [router.asPath]);

  const fetchRecipesHandler = useCallback(
    async (food: string | string[] | undefined) => {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${food}`
        );
        if (!response.ok) {
          setError(true);
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        data.data.recipe.length <= 0 && setError(true);
        setIsLoading(false);
        setRecipes(data.data.recipe);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    },
    []
  );
  const FavoriteHandler = () => {
    setFavorite((prev) => {
      return [...prev, recipes];
    });
    localStorage.setItem("favorite", JSON.stringify([...favorite, recipes]));
  };

  const RemovefavoriteHandler = () => {
    setFavorite((prev) => prev.filter((a) => a.id !== recipes.id));
    localStorage.setItem(
      "favorite",
      JSON.stringify(favorite.filter((a) => a.id !== recipes.id))
    );
  };
  return (
    <div className={classes.mainContainer}>
      {isLoading && <LoadingIndicator />}
      {!isLoading && !error && (
        <div className={classes.containerInfo} id={recipes.id}>
          <img src={recipes["image_url"]} className={classes.img} />
          <div className={classes.title}>
            <h3>{recipes.title}</h3>
          </div>
          <div className={classes.containerInformation}>
            <h4>
              {recipes["cooking_time"]}
              <span>MINUTES</span>
            </h4>
            <h4>
              {recipes["servings"]}
              <span>SERVINGS</span>
            </h4>
          </div>
          <div className={classes.container}>
            <h3>Ingredients</h3>
            <div>
              {recipes.ingredients?.map((elem, i) => {
                return (
                  <div key={i}>
                    <h4>
                      {elem.quantity && elem.quantity} {elem.unit && elem.unit}{" "}
                      {elem.description}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.container + " " + classes.gridArea}>
            <h3>HOW TO COOK IT</h3>
            <p>
              This recipe was carefully designed and tested by{" "}
              {recipes.publisher}. Please check out directions at their website.
            </p>
            <div>
              <a href={recipes.source_url}>Direction</a>
              {!favorite.some((a) => a?.id === recipes.id) ? (
                <button onClick={FavoriteHandler}>Add to my favorites</button>
              ) : (
                <button
                  className={classes.remove}
                  onClick={RemovefavoriteHandler}
                >
                  Remove my favorites
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {!isLoading && error && <p className={classes.error}>no recipe found!</p>}
    </div>
  );
};

export default recipe;
