const UserController = (req, res) => {
  const sampleData = {
    firstName: "Felistas",
    lastName: "Ngumi",
    email: "felistas@gmail.com"
  };
  res.send(sampleData);
};

export default UserController;
