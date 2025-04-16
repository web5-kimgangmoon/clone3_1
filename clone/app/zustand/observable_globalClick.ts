import { create } from "zustand";

type Observer = { func: () => void; id: string };

type ObservableState = { observers: Observer[]; oncePrevent: string[] };
type ObservableAction = {
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
  notify: () => void;
  prevent: (id: string) => void;
};

type ObservableStore = ObservableState & ObservableAction;

export const useObservableStore_globalClick = create<ObservableStore>()(
  (set, state) => ({
    oncePrevent: [],
    observers: [],
    subscribe: (observer) => {
      set((v) => ({ observers: [...v.observers, observer] }));
    },
    unsubscribe: (observer) =>
      set((state) => ({
        observers: state.observers.filter((v) => v !== observer),
      })),
    notify: () => {
      const obj = state();
      obj.observers
        .filter((v) => {
          return obj.oncePrevent.indexOf(v.id) === -1;
        })
        .forEach((v) => v.func());
      set({ oncePrevent: [] });
    },
    prevent: (id) => {
      set((v) => ({ oncePrevent: [...v.oncePrevent, id] }));
    },
  })
);
