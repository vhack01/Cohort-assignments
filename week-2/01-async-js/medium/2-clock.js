setInterval(function () {
  console.clear();
  const curr = new Date();
  console.log(
    curr.getHours() +
      ":" +
      curr.getMinutes() +
      "::" +
      curr.getSeconds() +
      " " +
      (curr.getHours() > 12 ? "PM" : "AM")
  );
}, 1000);
