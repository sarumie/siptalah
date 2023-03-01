// Type
import { LocalStoragePropType } from "../types/utils/localStorageType";

function LocalStorage({ method, key, value }: LocalStoragePropType) {
  switch (method) {
    case "get":
      const result = localStorage.getItem(key);
      return result ? JSON.parse(result) : null;

    case "set":
      localStorage.setItem(key, JSON.stringify(value));
      return;

    case "delete":
      localStorage.removeItem(key);
      return;
  }
}

export { LocalStorage };
