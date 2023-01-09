import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import Head from "next/head";

import classes from "../../styles/recipes.module.css";

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

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (router.query.search !== undefined) {
      fetchRecipesHandler(router.query.search);
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
      <Head>
        <title>Recipes - {router.query.search}</title>
      </Head>
      <div className={classes.recipeContainer}>
        {isLoading && <LoadingIndicator />}
        {!error ? (
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
                <img
                  src={
                    elem["image_url"]?.slice(0, 5) !== "https"
                      ? elem["image_url"]?.replace("http", "https")
                      : elem["image_url"]
                  }
                  alt={elem.title}
                />
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

export default Recipes;
