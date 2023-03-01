import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, ToDoInterface, toDoState } from "../atoms";

function ToDo({ text, category, id }: ToDoInterface) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

  //카테고리 변경
  const changeCategory = (selectedCategory: string) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);
      const newToDo = { text, category: selectedCategory, id };

      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    });
  }

  //투두 삭제
  const deleteToDo = (toDoName: string) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);
      return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)]
    })
  }

  return (
    <li>
      <span>{text}</span>
      {Object.values(categories).map((available) => (
        <button
          disabled={available === category}
          key={available}
          onClick={() => changeCategory(available)
          }
        >
          {available}
        </button>
      ))}
      <button onClick={() => deleteToDo(text)}>삭제</button>
    </li>
  );
}

export default ToDo;