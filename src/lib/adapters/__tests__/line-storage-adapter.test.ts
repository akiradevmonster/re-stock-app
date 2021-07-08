import { LineStorageAdapter } from '../line-storage-adapter';

// 実際のlocalStorageの参照を保持
const originalLocalStorage = global.localStorage;

// LIFFモック
const mockLiff = {
  isLoggedIn: jest.fn(),
  getDecodedIDToken: jest.fn(),
};

// localStorageモック
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

// Jest setup
beforeAll(() => {
  // windowオブジェクトをモック
  Object.defineProperty(global, 'window', {
    value: {
      liff: mockLiff,
      localStorage: mockLocalStorage,
    },
    writable: true,
  });
  
  // グローバルlocalStorageをモックに置き換え
  Object.defineProperty(global, 'localStorage', {
    value: mockLocalStorage,
    writable: true
  });
});

afterAll(() => {
  // テスト後に元のlocalStorageを復元
  Object.defineProperty(global, 'localStorage', {
    value: originalLocalStorage,
    writable: true
  });
});

// コンソールエラーをモック
const originalConsoleError = console.error;
console.error = jest.fn();

describe('LineStorageAdapter', () => {
  let adapter: LineStorageAdapter;
  
  beforeEach(() => {
    jest.clearAllMocks();
    adapter = new LineStorageAdapter();
  });
  
  afterAll(() => {
    console.error = originalConsoleError;
  });

  describe('getItem', () => {
    test('should prefix key with user ID when logged in', async () => {
      // モックを設定
      mockLiff.isLoggedIn.mockReturnValue(true);
      mockLiff.getDecodedIDToken.mockReturnValue({ sub: 'user123' });
      mockLocalStorage.getItem.mockReturnValue('{"test":"value"}');
      
      // テスト対象の関数を呼び出す
      const result = await adapter.getItem('testKey');
      
      // 検証
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('user123:testKey');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBe('{"test":"value"}');
      }
    });
    
    test('should use normal key when not logged in', async () => {
      // モックを設定
      mockLiff.isLoggedIn.mockReturnValue(false);
      mockLocalStorage.getItem.mockReturnValue('{"test":"value"}');
      
      // テスト対象の関数を呼び出す
      const result = await adapter.getItem('testKey');
      
      // 検証
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBe('{"test":"value"}');
      }
    });
    
    test('should handle errors', async () => {
      // エラーをスローするモックを設定
      mockLiff.isLoggedIn.mockImplementation(() => { 
        throw new Error('Test error'); 
      });
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Test error');
      });
      
      // テスト対象の関数を呼び出す
      const result = await adapter.getItem('testKey');
      
      // 検証
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBeInstanceOf(Error);
      }
    });
  });

  describe('setItem', () => {
    test('should prefix key with user ID when logged in', async () => {
      // モックを設定
      mockLiff.isLoggedIn.mockReturnValue(true);
      mockLiff.getDecodedIDToken.mockReturnValue({ sub: 'user123' });
      
      // テスト対象の関数を呼び出す
      const result = await adapter.setItem('testKey', '{"test":"value"}');
      
      // 検証
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user123:testKey', '{"test":"value"}');
      expect(result.ok).toBe(true);
    });
    
    test('should use normal key when not logged in', async () => {
      // モックを設定
      mockLiff.isLoggedIn.mockReturnValue(false);
      
      // テスト対象の関数を呼び出す
      const result = await adapter.setItem('testKey', '{"test":"value"}');
      
      // 検証
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('testKey', '{"test":"value"}');
      expect(result.ok).toBe(true);
    });
    
    test('should handle errors', async () => {
      // エラーをスローするモックを設定
      mockLiff.isLoggedIn.mockImplementation(() => { 
        throw new Error('Test error'); 
      });
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Test error');
      });
      
      // テスト対象の関数を呼び出す
      const result = await adapter.setItem('testKey', '{}');
      
      // 検証
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBeInstanceOf(Error);
      }
    });
  });

  describe('removeItem', () => {
    test('should prefix key with user ID when logged in', async () => {
      // モックを設定
      mockLiff.isLoggedIn.mockReturnValue(true);
      mockLiff.getDecodedIDToken.mockReturnValue({ sub: 'user123' });
      
      // テスト対象の関数を呼び出す
      const result = await adapter.removeItem('testKey');
      
      // 検証
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user123:testKey');
      expect(result.ok).toBe(true);
    });
    
    test('should use normal key when not logged in', async () => {
      // モックを設定
      mockLiff.isLoggedIn.mockReturnValue(false);
      
      // テスト対象の関数を呼び出す
      const result = await adapter.removeItem('testKey');
      
      // 検証
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('testKey');
      expect(result.ok).toBe(true);
    });
    
    test('should handle errors', async () => {
      // エラーをスローするモックを設定
      mockLiff.isLoggedIn.mockImplementation(() => { 
        throw new Error('Test error'); 
      });
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error('Test error');
      });
      
      // テスト対象の関数を呼び出す
      const result = await adapter.removeItem('testKey');
      
      // 検証
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBeInstanceOf(Error);
      }
    });
  });
});