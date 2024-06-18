import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "./components/NewsPage";
import Categories from "./components/Categories";

const categories = [
  { name: "general", text: "일반" },
  { name: "world", text: "국제" },
  { name: "nation", text: "미국" },
  { name: "business", text: "비즈니스" },
  { name: "technology", text: "기술" },
  { name: "entertainment", text: "연예" },
  { name: "sports", text: "스포츠" },
  { name: "science", text: "과학" },
  { name: "health", text: "건강" },
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
