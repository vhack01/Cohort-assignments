const obj1 = {
  id: 1,
  name: "vishwas",
};
const obj2 = {
  id: 2,
  name: "atul",
};

for (let key of Object.keys(obj1)) {
  console.log(key + " : " + obj1[key]);
}
