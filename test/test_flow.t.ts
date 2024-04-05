import { donate } from './path_to_donate_function';
import { Contract } from 'stellar-sdk'; // replace with actual import

jest.mock('stellar-sdk', () => {
  return {
    Contract: jest.fn().mockImplementation(() => {
      return {
        donate: jest.fn(),
        signAndSend: jest.fn(),
      };
    }),
  };
});

describe('donate', () => {
  it('returns success when transaction is successful', async () => {
    (Contract.prototype.signAndSend as jest.Mock).mockResolvedValue({
      getTransactionResponse: { status: 'SUCCESS' },
      sendTransactionResponse: { hash: 'txid' },
    });

    const result = await donate('contractId', 'from', 100);
    expect(result).toEqual({ success: true, txid: 'txid', error: null });
  });

  it('returns error when transaction is unsuccessful', async () => {
    (Contract.prototype.signAndSend as jest.Mock).mockResolvedValue({
      getTransactionResponse: { status: 'FAILURE' },
    });

    const result = await donate('contractId', 'from', 100);
    expect(result).toEqual({ success: false, txid: '', error: 'Error sending payment' });
  });

  it('returns error when signAndSend throws an error', async () => {
    (Contract.prototype.signAndSend as jest.Mock).mockRejectedValue(new Error('Test error'));

    const result = await donate('contractId', 'from', 100);
    expect(result).toEqual({ success: false, txid: '', error: 'Test error' });
  });
});