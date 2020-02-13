export interface Model {
  _id?: string;
}

export type PersistedModel<T extends Model> = T & Required<Pick<T, "_id">>;
