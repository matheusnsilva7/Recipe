import Link from "next/link";
import Image from "next/image";
import pizza from "../img/pizza.jpg";
import burger from "../img/burger2.jpg";
import salad from "../img/salad.jpg";
import lemonade from "../img/lemonade.jpg";
import taco from "../img/taco.jpg";
import pasta from "../img/pasta.jpg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import classes from "../styles/Home.module.css";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

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
    <main className={classes["home__container"]}>
      <Head>
        <title>Recipes - Home</title>
      </Head>
      <section className={classes.firstContainer}>
        <div>
          <h1>Search over 1,000,000 recipes</h1>
          <form onSubmit={submit}>
            <input
              type="text"
              autoComplete="off"
              name="search"
              placeholder="what recipe would you like to look for?"
            />
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="m19.825 21.65-6.35-6.35q-.75.575-1.837.912-1.088.338-2.213.338-2.975 0-5.037-2.062-2.063-2.063-2.063-5.038t2.063-5.038Q6.45 2.35 9.425 2.35t5.038 2.062q2.062 2.063 2.062 5.038 0 1.125-.312 2.15-.313 1.025-.913 1.825l6.375 6.375Zm-10.4-7.75q1.875 0 3.163-1.288 1.287-1.287 1.287-3.162t-1.287-3.163Q11.3 5 9.425 5 7.55 5 6.263 6.287 4.975 7.575 4.975 9.45q0 1.875 1.288 3.162Q7.55 13.9 9.425 13.9Z" />
              </svg>
            </button>
          </form>
        </div>
      </section>
      <section className={classes.recipesFoods}>
        <Link
          href="/recipes/pizza"
          className={classes.pizza}
        >
          <Image src={pizza} width="200" height="200" alt="" />
          <span>Pizza</span>
        </Link>
        <Link href="/recipes/burger" className={classes.burger}>
          <Image src={burger} width="200" height="200" alt="burger" />
          <span>Burger</span>
        </Link>
        <Link
          href="/recipes/salad"
          className={classes.salad}
        >
          <Image src={salad} width="200" height="200" alt="" />
          <span>Salad</span>
        </Link>
        <Link href="/recipes/lemonade" className={classes.lemonade}>
          <Image src={lemonade} width="200" height="200" alt="" />
          <span>Lemonade</span>
        </Link>
        <Link href="/recipes/taco" className={classes.taco}>
          <Image src={taco} width="200" height="200" alt="" />
          <span>Taco</span>
        </Link>
        <Link href="/recipes/pasta" >
          <Image src={pasta} width="200" height="200" alt="" />
          <span>Pasta</span>
        </Link>
      </section>
      <section className={classes.secondContainer} id="FavoritesRecipes">
        <h2>Favorites recipes</h2>
        <div className={classes.containerfavorites}>
          {recipes.length > 0 ? (
            recipes.map((elem: any) => {
              return (
                <Link
                  href={`/recipe/${elem.id}`}
                  className={
                    classes.recipe +
                    " " +
                    (JSON.parse(localStorage.getItem("favorite") || "[]")?.some(
                      (a: any) => a.id === elem.id
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
      </section>
    </main>
  );
}
