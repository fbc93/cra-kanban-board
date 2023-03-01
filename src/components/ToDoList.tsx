import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

//styled
const Container = styled.div`
width: 500px;
margin:auto;
`;

const Title = styled.h1`
font-size:40px;
font-weight: bold;
text-align: center;
margin:30px 20px;
`;

const CategoryTab = styled.ul`
width: 100%;
display: flex;
flex-flow: wrap;
justify-content: center;
margin-bottom:30px;

li {
  margin:5px;
}
`;

const CategoryItem = styled.button`
  width: 100%;
  display: block;
  background-color: #badc58;
  border:none;
  padding:7px 10px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  margin:0;
  font-weight:400;

  &:disabled{
    background-color: #009432;
    color:#ffffff;
  }
`;


const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom:10px;

  button {
    margin:0 5px;
  }
`;


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

  //스토리지 전체삭제
  const deleteAll = () => {
    console.log('delete all')
    window.localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <Container>
      <Title>To Do list ...🌱</Title>

      <BtnContainer>
        <button onClick={addCategory}>카테고리 추가</button>
        <button onClick={deleteAll}>전체삭제</button>
      </BtnContainer>

      <CategoryTab>
        {categories.map((available) => (
          <li key={available}>
            <CategoryItem
              onClick={() => onClick(available)}
              disabled={available === category}
            >{available}</CategoryItem>
          </li>
        ))}
      </CategoryTab>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) =>
          <ToDo key={toDo.id} {...toDo} />
        )}
      </ul>
    </Container>
  );
}

export default ToDoList;