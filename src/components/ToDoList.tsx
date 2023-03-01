import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);


  //카테고리 추가 버튼 Click
  const onClick = (category: string) => {
    setCategory(category);
  };

  //카테고리 추가 logic
  const addCategory = () => {
    const newCategory = prompt("추가할 카테고리를 작성하세요", "");

    if (newCategory) {

      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <div>
      <h1>To Do list</h1>
      <ul>
        {categories.map((available) => (
          <li key={available}>
            <button
              onClick={() => onClick(available)}
              disabled={available === category}
            >{available}</button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={addCategory}>카테고리 추가</button>
      </div>

      <CreateToDo />

      <ul>
        {toDos.map((toDo) =>
          <ToDo key={toDo.id} {...toDo} />
        )}
      </ul>

    </div>
  );
}

export default ToDoList;