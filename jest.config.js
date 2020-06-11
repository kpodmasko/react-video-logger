"use strict";

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(tsx|ts)?$": "ts-jest",
    "^.+\\.(jsx|js)?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@root(.*)$": "<rootDir>/src$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@actions(.*)$": "<rootDir>/src/actions$1",
    "^@reducers(.*)$": "<rootDir>/src/reducers$1",
    "^@sagas(.*)$": "<rootDir>/src/sagas$1",
    "^@store(.*)$": "<rootDir>/src/store$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "^@declarations(.*)$": "<rootDir>/src/declarations/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
