let counter = 0;
function update() {
  setTimeout(function () {
    console.log(counter++);
    update();
  }, 1000);
}
update();
