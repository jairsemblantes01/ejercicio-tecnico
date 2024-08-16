module.exports = {
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["./jest.setup.js"],
	testPathIgnorePatterns: [
		"/node_modules/",
		"/src/__tests__/__mocks__/"
	],
};
