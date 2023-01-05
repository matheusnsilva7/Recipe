import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";

import classes from "../../styles/recipes.module.css";

const recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (router.query.recipeId !== undefined) {
      fetchRecipesHandler(router.query.recipeId);
    }
    if (error) setError(false);
    if (recipes.length !== 0) setRecipes([]);
    if (!isLoading) setIsLoading(true);
  }, [router.asPath]);

  const fetchRecipesHandler = useCallback(
    async (food: string | string[] | undefined) => {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${food}`
        );
        if (!response.ok) {
          setError(true);
          return;
        }
        const data = await response.json();
        data.data.recipes.length <= 0 && setError(true);
        setIsLoading(false);
        setRecipes(data.data.recipes);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <div className={classes.container}>
      <div className={classes.recipeContainer}>
        {isLoading && <LoadingIndicator />}
        {!error ? (
          recipes.slice((page - 1) * 6, page * 6).map((elem: any) => {
            return (
              <div className={classes.recipe} key={elem.id}>
                <img src={elem["image_url"]} />
                <h4>{elem.title}</h4>
                <h5>{elem.publisher}</h5>
              </div>
            );
          })
        ) : (
          <p className={classes.error}>no recipe found!</p>
        )}
      </div>
      <div className={classes.page}>
        {!isLoading && (
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
        )}
      </div>
    </div>
  );
};

export default recipe;
