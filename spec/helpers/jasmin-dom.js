import JasmineDOM from '@testing-library/jasmine-dom';

beforeAll(() => {
	jasmine.getEnv().addMatchers(JasmineDOM);
});