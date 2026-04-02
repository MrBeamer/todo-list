class StorageService {
  constructor() {}

  set setTask(item) {
    localStorage.setItem("myCat", item);
  }

  //   const car = { doors: 2, color: "red" };
  // const carStr = JSON.stringify(car);
  // localStorage.setItem("message", carStr);

  // const word = localStorage.getItem("message");
  // //localStorage.removeItem("message");
  // const obj = JSON.parse(word);
}
