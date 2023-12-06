const { mockDeep, mockReset } = require('jest-mock-extended');

const axios = require('axios');

const axiosMock = axios;

jest.mock('axios', () => mockDeep());

beforeEach(() => {
  	mockReset(axiosMock);
});

module.exports = {axiosMock};
