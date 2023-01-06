import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Classes from "./navbar.module.css";

const navBar = () => {
  const router = useRouter();
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (router.asPath !== "/") setSearch(true);
    else setSearch(false);
    if (
      router.asPath !== "/recipes/[recipeId]" &&
      router.asPath !== "/" &&
      router.asPath.split("/")[1] !== "recipe" &&
      router.asPath !== "/favoritesrecipe"
    )
      setInput(router.asPath.split("/")[2].replaceAll("%20", " "));
  }, [router.asPath]);

  const submit = (e: any) => {
    e.preventDefault();
    if (e.target["0"].value.trim() !== "") {
      router.push(`/recipes/${e.target["0"].value}`);
    }
    setMobileNav(false);
  };

  return (
    <nav className={Classes.nav}>
      <button
        aria-label="Btn"
        className={Classes.button}
        onClick={() => setMobileNav(true)}
      >
        <div className={Classes.icon}></div>
      </button>
      {mobileNav && (
        <div
          className={Classes.background}
          onClick={() => setMobileNav(false)}
        ></div>
      )}
      <div
        className={
          mobileNav ? `${Classes.links} ${Classes.show}` : Classes.links
        }
      >
        <div onClick={() => setMobileNav(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
          </svg>
        </div>
        <div className={Classes.logo}>
          <Link href="/">
            <h1>recipe</h1>
          </Link>
        </div>
        <ul>
          <li>
            {search && (
              <form className={Classes.form} onSubmit={submit}>
                <input
                  type="text"
                  autoComplete="off"
                  name="search"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                  >
                    <path d="m19.825 21.65-6.35-6.35q-.75.575-1.837.912-1.088.338-2.213.338-2.975 0-5.037-2.062-2.063-2.063-2.063-5.038t2.063-5.038Q6.45 2.35 9.425 2.35t5.038 2.062q2.062 2.063 2.062 5.038 0 1.125-.312 2.15-.313 1.025-.913 1.825l6.375 6.375Zm-10.4-7.75q1.875 0 3.163-1.288 1.287-1.287 1.287-3.162t-1.287-3.163Q11.3 5 9.425 5 7.55 5 6.263 6.287 4.975 7.575 4.975 9.45q0 1.875 1.288 3.162Q7.55 13.9 9.425 13.9Z" />
                  </svg>
                </button>
              </form>
            )}
          </li>
          <li>
            <Link href="/favoritesrecipe">Favorites recipe</Link>
          </li>
          <li>
            <Link href="/">My recipe</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navBar;
