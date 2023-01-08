import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import classes from "../styles/Home.module.css";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const refFavorite = useRef<HTMLInputElement>(null)

  useEffect(() => {
    localStorage.getItem("favorite") &&
      setRecipes(JSON.parse(localStorage.getItem("favorite") || "[]"));
  }, []);

  const router = useRouter();
  const submit = (e: any) => {
    e.preventDefault();
    if (e.target["0"].value.trim() !== "") {
      router.push(`/recipes/${e.target["0"].value}`);
    }
  };
  return (
    <div className={classes["home__container"]}>
      <div className={classes.firstContainer}>
        <h1>BEST RECIPES</h1>
        <form onSubmit={submit}>
          <input type="text" autoComplete="off" name="search" />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m19.825 21.65-6.35-6.35q-.75.575-1.837.912-1.088.338-2.213.338-2.975 0-5.037-2.062-2.063-2.063-2.063-5.038t2.063-5.038Q6.45 2.35 9.425 2.35t5.038 2.062q2.062 2.063 2.062 5.038 0 1.125-.312 2.15-.313 1.025-.913 1.825l6.375 6.375Zm-10.4-7.75q1.875 0 3.163-1.288 1.287-1.287 1.287-3.162t-1.287-3.163Q11.3 5 9.425 5 7.55 5 6.263 6.287 4.975 7.575 4.975 9.45q0 1.875 1.288 3.162Q7.55 13.9 9.425 13.9Z" />
            </svg>
          </button>
        </form>
        <h3>
          Popular searches:{" "}
          <span>
            <Link className={classes.link} href="/recipes/pizza">
              pizza
            </Link>
            ,{" "}
            <Link className={classes.link} href="/recipes/pasta">
              pasta
            </Link>
            .
          </span>
        </h3>
      </div>
      <div className={classes.secondContainer}>
        <h2>Favorites recipes</h2>
        <div>
          <div ref={refFavorite} className={classes.containerfavorites}>
            {recipes.length > 0 ? (
              recipes.map((elem: any) => {
                return (
                  <Link
                    href={`/recipe/${elem.id}`}
                    className={
                      classes.recipe +
                      " " +
                      (JSON.parse(
                        localStorage.getItem("favorite") || "[]"
                      )?.some((a: any) => a.id === elem.id) && classes.favorite)
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
                <div className={classes.arrowleft} onClick={() => refFavorite.current?.scrollBy(-260,0)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    width="48"
                  >
                    <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" />
                  </svg>
                </div>
                <div className={classes.arrowright} onClick={() => refFavorite.current?.scrollBy(260,0)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    width="48"
                  >
                    <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                  </svg>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
