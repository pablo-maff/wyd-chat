export class LocalStorageManager {
  static setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  }

  static getItem(key) {
    const value = localStorage.getItem(key);
    const parsedValue = JSON.parse(value);

    return parsedValue
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  }
}
