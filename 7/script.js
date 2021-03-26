class Employee {
	constructor(name, surname, rate) {
		this.name= name;
		this.surname = surname;
		this.rate = rate;
	}
}

const newEmpl = new Employee('John', 'Doe', 12);
console.log(newEmpl);
class Developer extends Employee {
	constructor(name, surname, rate, position) {
		super(name, surname, rate)
	}
}
cons dev2 = new Developer('adsf', 'aa', 24);
class Tester  extends Employee{

}
class Project {
	constructor(name, budget) {
		this.name = name;
		this.budget = budget;
	}
	
}

const proj = new Project('my project', 12000);
console.log(proj);