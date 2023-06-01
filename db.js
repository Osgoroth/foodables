import Dexie from "dexie";

export const db = new Dexie("foodablesDatabase");

db.version(1).stores({
  recipes: "++id, recipeName, ingredients",
});
