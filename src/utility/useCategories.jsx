import { useEffect, useState } from "react";
import newsApi from "../Api/newsApi";

function useCategories() {
  const [categories, setCategories] = useState({});
  useEffect(() => {
    newsApi.getCategories().then((cate) => setCategories(cate));
  }, []);

  return categories;
}

export default useCategories;
