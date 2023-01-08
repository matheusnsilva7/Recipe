import classes from "./Form.module.css";

const form = () => {
  return (
    <div className={classes.container}>
      <form>
        <label>New Recipe</label>
        <input type="text" />
      </form>
    </div>
  );
};

export default form;
