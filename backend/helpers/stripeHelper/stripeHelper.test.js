const { validateRequest } = require('./stripeHelper');
const errorMessages = require('../../messages/errorMessages');

const REQUEST = {
  id: '123',
  paymentRef: null,
  paper: {
    id: '123',
  },
  pageUploads: [{ id: '123' }],
};

describe('Validates feedback request before payment is made', () => {
  test('succeeds if payment attempted on a valid request', () => {
    // Arrange
    const testRequest = REQUEST;

    const prismaMock = {
      request: jest.fn(() => ({
        $fragment: () => testRequest,
      })),
    };

    // Act
    const validated = validateRequest(prismaMock, { requestId: '123' });

    // Assert
    return expect(validated).resolves.toMatchObject(REQUEST);
  });

  test('fails if payment attempted on a request where payment has already been taken', () => {
    // Arrange
    const testRequest = {
      ...REQUEST,
      paymentRef: '123',
    };

    const prismaMock = {
      request: jest.fn(() => ({
        $fragment: () => testRequest,
      })),
    };

    // Act
    const validated = validateRequest(prismaMock, { requestId: '123' });

    // Assert
    return expect(validated).rejects.toBe(errorMessages.PAYMENT_ALREADY_MADE);
  });

  test('fails if payment attempted on a request where no answer pages have been uploaded', () => {
    // Arrange
    const testRequest = {
      ...REQUEST,
      pageUploads: [],
    };

    const prismaMock = {
      request: jest.fn(() => ({
        $fragment: () => testRequest,
      })),
    };

    // Act
    const validated = validateRequest(prismaMock, { requestId: '123' });

    // Assert
    return expect(validated).rejects.toBe(
      errorMessages.NO_ANSWERSHEETS_UPLOADED,
    );
  });
});
