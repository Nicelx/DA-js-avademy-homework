(function() {
	function Employee(name, surname) {
		this.name = name;
		this.surname = surname;
	}
	
	function Developer(...dev) {
		Employee.apply(this, dev)
	}
	function Tester(...tester) {
		Employee.apply(this, tester)
	}
	function Project() {
		this.developers = [];
		this.testers = [];
	}
	
	
	Developer.prototype = Object.create(Employee.prototype);
	Tester.prototype = Object.create(Employee.prototype);
	
	Employee.prototype.getFullName = function () {
		const { name, surname } = this;
		return `${name} ${surname}`;
	};
	Project.prototype.addDeveloper = function(developer) {
		this.developers.push(developer)
		return this
	}
	Project.prototype.addTester = function(tester) {
		this.testers.push(tester);
		return this
	}
	Project.prototype.getTeam = function() {
		const developers = this.developers.map(item => item.getFullName())
		const testers = this.testers.map(item => item.getFullName())
		return {
			developers,
			testers
		}
	}
	
	
	
	const dev1 = new Developer('Hugo', 'Jenkis');
	const dev2 = new Developer('Mark', 'Simpson');
	const tester = new Tester('Emilia', 'Roberson');

	const project = new Project();
	const toLog = project.addDeveloper(dev1).addDeveloper(dev2).addTester(tester).getTeam()
	// console.log(toLog)
})() 


