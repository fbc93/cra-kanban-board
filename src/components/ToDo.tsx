import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, ToDoInterface, toDoState } from "../atoms";

const ToDoWrapper = styled.div`
  background-color: #ffeaa7;
  margin:10px 0;
  padding:20px;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
`;

const ToDoTitle = styled.div`
  width: 100%;
    text-align: left;
    font-size: 20px;
    margin-bottom: 15px;
`;

const LeftBox = styled.div`
  button {
    margin:5px;
    border-radius: 5px;
    border:1px solid #999999;
    padding:3px 8px;

    &:disabled{
      background-color: #fdcb6e;
      color:#333333;
      font-weight: bold;
      border:1px solid #333333;

      &::before{
      content:'📂 ';
    }
    }

    &::before{
      content:'📁 ';
    }
  }
`;

const RightBox = styled.div`
  button {
    width: 70px;
    display: inline-block;
    height: 100%;
  }
`;

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
    <ToDoWrapper>
      <LeftBox>
        <ToDoTitle>{text}</ToDoTitle>
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
      </LeftBox>
      <RightBox>
        <button onClick={() => deleteToDo(text)}>삭제</button>
      </RightBox>
    </ToDoWrapper>
  );
}

export default ToDo;