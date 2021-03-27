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

	static formatFullName = (
		fullName,
		options = { formatter: Utils.formatName, toArray: true }
	) => {
		const { formatter, toArray } = options;
		const arrs = fullName.split(" ");

		if (arrs.length > 4 || arrs.length < 2) {
			throw new Error(
				"full name should contain at least name and surname"
			);
		}

		return arrs.map((item) => formatter(item)).join(" ");
	};
}

