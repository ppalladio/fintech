import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';
const storage = new MMKV({
    id: 'balance-storage',
});

export const zustandStorage: StateStorage = {
    setItem: (name: string, value: any) => {
        return storage.set(name, value);
    },
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem: (name: string) => {
        return storage.delete(name);
    },
};
