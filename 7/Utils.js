class Utils {
	
	static formatName = (name) => {
		if (!(name && typeof name === "string" && name.length > 1)) {
			throw new Error("name invalid");
		}

		return name
			.replace(/[\d\W_]/g, "")
			.toLowerCase()
			.replace(/\w/, (match) => match.toUpperCase());
	};

	static formatFullName = (fullName, options = { toObj: false }) => {
		const { toObj } = options;
		const {formatName} = Utils;
		let nameArray = fullName.split(" ");

		if (!nameArray.length === 2) {
			throw new Error(
				"full name should contain at least name and surname"
			);
		}

		nameArray = nameArray.map((item) => formatName(item));

		if (toObj) {
			const [name, surname] = nameArray;
			return {
				name,
				surname,
			};
		}

		return nameArray.join(" ");
	};
}
