import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "./components/NewsPage";
import Categories from "./components/Categories";

const categories = [
  { name: "all", text: "전체보기" },
  { name: "business", text: "비즈니스" },
  { name: "entertainment", text: "엔터테인먼트" },
  { name: "health", text: "건강" },
  { name: "science", text: "과학" },
  { name: "sports", text: "스포츠" },
  { name: "technology", text: "기술" },
];
const App = () => {
  return (
    <BrowserRouter>
      <Categories categories={categories} />
      <Routes>
        <Route path="*" element={<NewsPage></NewsPage>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
