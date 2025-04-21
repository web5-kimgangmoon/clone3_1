import { create } from "zustand";

type Event = { func: () => void; id: string };

type EventListState = { eventList: Event[]; oncePrevent: string[] };
type EventListAction = {
  push: (event: Event) => void;
  pop: (id: string) => void;
  execute: () => void;
  prevent: (id: string) => void;
};

type EventListStore = EventListState & EventListAction;

export const useEventListStore_globalClick = create<EventListStore>()(
  (set, state) => ({
    oncePrevent: [],
    eventList: [],
    push: (ev) => {
      set((v) => ({ eventList: [...v.eventList, ev] }));
    },
    pop: (id) =>
      set((state) => ({
        eventList: state.eventList.filter((v) => v.id !== id),
      })),
    execute: () => {
      const current = state();
      current.eventList
        .filter((v) => {
          return current.oncePrevent.indexOf(v.id) === -1;
        })
        .forEach((v) => v.func());
      set({ oncePrevent: [] });
    },
    prevent: (id) => {
      set((v) => ({ oncePrevent: [...v.oncePrevent, id] }));
    },
  })
);
