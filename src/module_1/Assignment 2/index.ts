interface Person {
  name: string;
  age: number;
  email: string;
}

const developer: Person = {
  age: 22,
  name: "TuyenHM",
  email: "tuyenhm@mail.com",
};

const logInfo = (infor: Person) => {
  console.log(infor);
};

logInfo(developer);
