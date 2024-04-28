import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { zustandStorage } from './mmkv-storage';

export interface TransactionProps {
    id: string;
    amount: number;
    date: Date;
    title?: string;
}

export interface BalanceProps {
    transactions: Array<TransactionProps>;
    runTransaction: (transaction: TransactionProps) => void;
    balance: () => number;
    clearTransactions: () => void;
}

export const useBalanceStore = create<BalanceProps>()(
    persist(
        (set, get) => ({
            transactions: [],
            runTransaction: (transaction: TransactionProps) => {
                set((state) => ({
                    transactions: [...state.transactions, transaction],
                }));
            },
            balance: () => get().transactions.reduce((acc, cur) => acc + cur.amount, 0),
            clearTransactions: () => {
                set({
                    transactions: [],
                });
            },
        }),
        {
            name: 'balance',
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
);
