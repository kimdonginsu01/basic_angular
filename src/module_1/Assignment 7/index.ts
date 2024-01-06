export {};

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/books");
  const data = await response.json();
  return data;
};

const books = await fetchData();

console.log(books);
