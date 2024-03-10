import { useEffect, useState } from "react";
import styles from "./itemsPage.module.scss";
import Table from "../../../Components/Table/index";
import { CategoryItem, TCategories, TSearch } from "./types";
import Loading from "../../../Components/Loading/Loading";
import { getData, getIds } from "../../../api";
import {
  Action,
  TFilterBrand,
  TFilterPrice,
  TFilterProduct,
  TIds,
  TProducts,
} from "../../../api/types";
import { columns } from "./constants";
import Settings from "../Settings";

const ListProducts = () => {
  const [search, setSearch] = useState<TSearch>({ category: TCategories.EMPTY, searchText: "" });
  const [products, setProducts] = useState<CategoryItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [countData, setCountData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const onKeyDown = (e: React.KeyboardEvent, objSearch: TSearch) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    setSearch(objSearch);
  };

  useEffect(() => {
    const getAllCountProducts = async (attempt = 1) => {
      try {
        setIsLoading(true);
        const count: string[] = await getIds();
        setCountData(count.length);
        setIsLoading(false);
      } catch (error) {
        if (attempt < 3) {
          console.log(error);
          getAllCountProducts(attempt + 1);
        } else {
          setError(error);
        }
      }
    };

    const searchProducts = async (attempt = 1) => {
      const getIdsProducts = () => {
        switch (search.category) {
          case TCategories.BRAND:
            return getData<TFilterBrand>(Action.FILTER, {
              brand: search.searchText,
            });
          case TCategories.PRICE:
            return getData<TFilterPrice>(Action.FILTER, {
              price: Number(search.searchText),
            });
          case TCategories.PRODUCT:
            return getData<TFilterProduct>(Action.FILTER, {
              product: search.searchText,
            });
          default:
            return [];
        }
      };

      try {
        setIsLoading(true);
        const idsProducts: string[] = await getIdsProducts();
        console.log("idsProducts: ", idsProducts);
        setCountData(idsProducts.length);
        const products = await getData<TProducts>(Action.GET_ITEMS, { ids: idsProducts });
        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        if (attempt < 3) {
          searchProducts(attempt + 1);
          console.log(attempt);
        } else {
          setError(error);
        }
      }
    };

    if (search.category === TCategories.EMPTY) {
      getAllCountProducts();
    } else {
      searchProducts();
    }
  }, [search]);

  useEffect(() => {
    const getProducts = async (attempt = 1) => {
      try {
        setIsLoading(true);
        const ids = await getData<TIds>(Action.GET_IDS, { offset: offset, limit: limit });
        const products = await getData<TProducts>(Action.GET_ITEMS, { ids: ids });
        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        if (attempt < 3) {
          console.log(error);
          getProducts(attempt + 1);
        } else {
          setError(error);
        }
      }
    };

    getProducts();
  }, [offset, limit]);

  const onChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };
  const next = () => {
    setOffset((prev) => {
      if (prev < countData - limit) {
        return prev + limit;
      }
      return prev;
    });
  };
  const prev = () => {
    if (offset > 0) {
      return setOffset((prev) => prev - limit);
    }
    return setOffset(0);
  };

  return (
    <div className={styles.itemsTable}>
      {error ? (
        <div>
          <h2>Сообщение об ошибке:</h2>
          <p>{error.message}</p>
        </div>
      ) : (
        <>
          {!isLoading ? (
            <Table title="Список товаров" data={products} columns={columns}>
              <Settings
                limit={limit}
                search={search}
                onChangeLimit={onChangeLimit}
                onKeyDown={onKeyDown}
                countData={countData}
              />
            </Table>
          ) : (
            <Loading />
          )}
          {search.category === TCategories.EMPTY && (
            <div className={styles.pagination}>
              <button onClick={prev}>{"< "}prev</button>
              <span className={styles.infoPages}>
                {1 + Math.floor(offset / limit)} из {Math.ceil(countData / limit)}
              </span>
              <button onClick={next}>next {" >"}</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListProducts;
