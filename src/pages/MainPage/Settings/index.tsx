import { useState } from "react";
import styles from "./settings.module.scss";
import { TCategories, TSearch } from "../ListProducts/types";

interface TSettings {
  limit: number;
  countData: number;
  search: TSearch;
  onChangeLimit(e: React.ChangeEvent<HTMLSelectElement>): void;
  onKeyDown(e: React.KeyboardEvent, objSearch: TSearch): void;
}

function Settings({ limit, onChangeLimit, onKeyDown, countData, search }: TSettings) {
  const [category, setCategory] = useState<TCategories>(TCategories.EMPTY);
  const [searchText, setSearchText] = useState("");

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.defaultValue as TCategories);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.list}>
        {search.category === TCategories.EMPTY && (
          <label>
            Показывать по:
            <select value={limit} onChange={(e) => onChangeLimit(e)}>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>50</option>
            </select>
          </label>
        )}
        <span>Всего товаров: {countData}</span>
      </div>

      <form className={styles.form}>
        <div className={styles.form__fields}>
          <span>Категории: </span>
          <span>Поиск: </span>
        </div>
        <div className={styles.form__search}>
          <div className={styles.categories}>
            <label className={styles.categories__item}>
              <input
                type="radio"
                name="category"
                id="brand"
                defaultValue={TCategories.BRAND}
                onChange={(e) => onChangeCategory(e)}
              />
              <span>Бренд</span>
            </label>
            <label className={styles.categories__item}>
              <input
                type="radio"
                name="category"
                id="product"
                defaultValue={TCategories.PRODUCT}
                onChange={(e) => onChangeCategory(e)}
              />
              <span>Продукт</span>
            </label>
            <label className={styles.categories__item}>
              <input
                type="radio"
                name="category"
                id="price"
                defaultValue={TCategories.PRICE}
                onChange={(e) => onChangeCategory(e)}
              />
              <span>Цена</span>
            </label>
          </div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => onKeyDown(e, { category, searchText })}
          />
        </div>
      </form>
    </div>
  );
}

export default Settings;
