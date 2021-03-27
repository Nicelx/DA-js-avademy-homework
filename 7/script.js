const {formatFullName} = Utils


class Employee {
	constructor(name, surname) {
		this.name = name;
		this.surname = surname;
	}
	_work = 0;

}

class Developer extends Employee {
	makeIt() {
		this._work += Math.random().toFixed(2);
	}
}
class Tester extends Employee {
	testIt()
}

class Project {
	_developers = [];
	_testers = [];

	addDevelopers(dev) {
		this._developers.push(formatFullName(dev));
	}
	get developers() {
		return this._developers;
	}
	set developers() {
		return 
	}
}

const x = new Project();
x.addDevelopers("hey sdf");
console.log(x);
console.log(y);
