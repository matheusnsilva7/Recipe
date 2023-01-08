import { useState } from "react";
import Form from "../components/Form";

import classes from "../styles/myrecipes.module.css";

const myrecipe = () => {
    const [newRecipe,setNewRecipe] = useState(true);
  return (
    <div className={classes.container}>
      <h3>MY RECIPE</h3>
      <button onClick={() => setNewRecipe(true)}>ADD NEW RECIPE</button>
      {newRecipe && <Form />}
      <div></div>
    </div>
  );
};

export default myrecipe;
