import { EntityStore } from 'src/types';

interface IdWrapper {
  id: number;
}

export function createEntityStore<M, E extends M = M>(): EntityStore<M, E> {
  return {
    byId: {}
  };
}

export function saveEntityToStore<M extends IdWrapper, E extends M = M>(
  store: EntityStore<M, E>,
  entity: E,
  isDetailed = true
) {
  const existing = store.byId[entity.id] || { lastFullUpdate: 0 };

  // delete all keys that are set to undefined, to avoid overriding existing values
  Object.keys(entity).forEach((key) => (entity as any)[key] === undefined && delete (entity as any)[key]);

  store.byId[entity.id] = {
    ...existing,
    ...entity,
    lastUpdate: Date.now(),
    lastFullUpdate: isDetailed ? Date.now() : existing.lastFullUpdate
  };
}
