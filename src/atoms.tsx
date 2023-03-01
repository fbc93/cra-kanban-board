import { atom, selector } from "recoil";

//default Category
export let defaultCategories: string[] = ["TO_DO", "DOING", "DONE"];

//category, categories State
export const categoryState = atom<string>({
  key: "category",
  default: defaultCategories[0], //To_DO > 최초 기본값
});

export const categoriesState = atom<string[]>({
  key: "categoriesState",
  default: JSON.parse(localStorage.getItem("categories") ?? JSON.stringify(defaultCategories)),
});

//
export interface ToDoInterface {
  text: string;
  id: number;
  category: string;
}

//toDo State
export const toDoState = atom<ToDoInterface[]>({
  key: "toDos",
  default: JSON.parse(localStorage.getItem("toDos") ?? "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});