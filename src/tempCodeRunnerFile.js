function Person(name) {
  this.name = name;
}

const person = new Person('juunzzi');

Person.prototype.getName = function () {
  return this.name;
};

console.log(person.getName());