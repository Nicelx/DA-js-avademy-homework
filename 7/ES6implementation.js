const { formatName, formatFullName } = Utils;
// i suppose i made a mistake and i should define method above in those classes where i am gonna use them.
// so the question is... Do classes have to be self sufficient or that is ok to reffer to outer sources

class Employee {
	constructor(...fullName) {
		if (fullName.length === 1) {
			const { name, surname } = formatFullName(fullName[0], {
				toObj: true,
			});

			this.name = name;
			this.surname = surname;

			return;
		}

		this.name = formatName(fullName[0]);
		this.surname = formatName(fullName[1]);
	}

	// formatFullName and getFullName are different things
	getFullName() {
		const { name, surname } = this;
		return `${name} ${surname}`;
	}
	presentYourself() {
		console.log("i'm employee");
	}
}

// constructor is inherited  from Employee by default if construnctor isn't defined
class Developer extends Employee {
	_work = 0;
	makeIt(num) {
		if (typeof num === "number") this._work += num;
		else this._work += 1;
	}
}

class Tester extends Employee {
	// Polymorphism case
	presentYourself() {
		console.log("i am tester now");
	}
}

class Project {
	_developers = [];
	_testers = [];
	_totalWork = 0;

	addDevelopers(...dev) {
		if (dev.length === 1) {
			const singleParam = dev[0];

			if (singleParam instanceof Developer) {
				this._developers.push(singleParam);
				return this;
			}
			if (typeof singleParam === "string") {
				const devObj = new Developer(formatFullName(singleParam));
				this._developers.push(devObj);
				return this;
			}
			if (singleParam instanceof Array) {
				singleParam.forEach((item) => {
					if (item instanceof Developer) this._developers.push(item);
				});
				return this;
			}
			throw new Error(
				"invalid input. must be 1 string, developer objects, or array of those objects"
			);
		}

		dev.forEach((item) => {
			if (item instanceof Developer) this._developers.push(item);
		});
		return this;
	}

	addTesters(tester) {
		if (tester instanceof Tester) {
			this._testers.push(tester);
			return tester;
		} else
			throw new Error("addTesters must receive instance of Tester class");
	}

	static _objectToArray(employee) {
		return employee.map((item) => item.getFullName());
	}

	get developerNames() {
		return Project._objectToArray(this._developers);
	}
	get testerNames() {
		return Project._objectToArray(this._testers);
	}

	set developerNames(x) {
		console.log(`use AddDevelopers(${x}) instead`);
	}
	set testerNames(x) {
		console.log(`use AddTesters(${x}) instead`);
	}

	getTeam() {
		return {
			developers: this.developerNames,
			testers: this.testerNames,
		};
	}
	computeTotalWork() {
		this._totalWork = this._developers.reduce(
			(sum, item) => item._work + sum,
			0
		);
		return this._totalWork;
	}
	testAndRelease() {
		let tests = this._developers.every((item) => this.testIt(item));
		if (tests) {
			console.log(
				`congratulations your project ready for release with project value = ${this._totalWork}`
			);
			return true;
		} else {
			console.log(`we have found serious bugs, project isn't ready`);
		}
	}
}
const testItMixin = {
	testIt(developer) {
		const flip = Math.random() > 0.2 ? true : false;
		if (flip) return true;
		else {
			developer._work -= 0.5;
			return false;
		}
	},
};
Object.assign(Tester.prototype, testItMixin);
Object.assign(Project.prototype, testItMixin);

// we can create and add developers in various ways
const dev = new Developer("mark", "Polo");
const dev2 = new Developer("Harry Poter");
const trainees = new Array(3).fill("_").map((_) => {
	trainee = new Developer("Smith Jekson");
	return trainee;
});
const toster = new Tester("Alex Gray");

const project = new Project();

dev2.makeIt(2);
dev.makeIt(24);
console.log(dev);

project
	.addDevelopers(dev, dev2)
	.addDevelopers(trainees)
	.addDevelopers("Last Resort")
	.addTesters(toster);

project.computeTotalWork();
project.testAndRelease();

console.log(project.getTeam());
