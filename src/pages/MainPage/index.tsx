import ListProducts from "./ListProducts";
import styles from "./mainPage.module.scss";

function MainPage() {
  return (
    <div className={styles.main}>
      <ListProducts />
    </div>
  );
}

export default MainPage;
