const users = [
  {
    id: 1,
    name: "Fikayo Adepoju",
    email: "fik4christ@yahoo.com",
    password: "test1",
    likes: [8034, 8035],
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@company.com",
    password: "test2",
    likes: [8034],
  },
  {
    id: 3,
    name: "Jane Paul",
    password: "test3",
    email: "jane@company.com",
    likes: [],
  },
];

module.exports.database = {
  users,
};
