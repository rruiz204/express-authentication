import { TestClient } from "../repositories/database";
import EnumTables from "../types/enums";

const RefreshDatabase = (tables: EnumTables[]) => {
  tables.forEach(async (table) => await TestClient[table].deleteMany({}));
}

export default RefreshDatabase;