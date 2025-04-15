import { create } from "zustand";

type Observer = () => void;

type ObservableState = { observers: Observer[] };
type ObservableAction = {
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
  notify: () => void;
};

type ObservableStore = ObservableState & ObservableAction;

export const useObservableStore_globalClick = create<ObservableStore>()(
  (set, state) => ({
    observers: [],
    subscribe: (observer) =>
      set((v) => ({ observers: [...v.observers, observer] })),
    unsubscribe: (observer) =>
      set((state) => ({
        observers: state.observers.filter((v) => v !== observer),
      })),
    notify: () => state().observers.forEach((v) => v()),
  })
);
