import { initializeLiff } from '../liff';

// モックの準備
jest.mock('@line/liff', () => ({
  __esModule: true,
  default: {
    init: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('LIFF initialization', () => {
  beforeEach(() => {
    // windowオブジェクトのモック
    Object.defineProperty(window, 'liff', {
      value: undefined,
      writable: true,
    });
    
    // コンソールエラーのモック
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // モックをリセット
    jest.clearAllMocks();
  });

  test('should initialize LIFF with the provided ID', async () => {
    const mockLiffId = 'mock-liff-id';
    await initializeLiff(mockLiffId);
    
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const liffModule = require('@line/liff').default;
    expect(liffModule.init).toHaveBeenCalledWith({ 
      liffId: mockLiffId,
      withLoginOnExternalBrowser: true
    });
  });

  test('should handle initialization errors', async () => {
    const mockLiffId = 'mock-liff-id';
    const mockError = new Error('LIFF initialization failed');
    
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const liffModule = require('@line/liff').default;
    liffModule.init.mockRejectedValueOnce(mockError);
    
    await initializeLiff(mockLiffId);
    
    expect(console.error).toHaveBeenCalledWith('LIFF initialization failed', mockError);
  });
});