import { TestClient } from "./clients";
import EnumTables from "../types/tables";

const RefreshDatabase = async (tables: EnumTables[]) => {
  for (let index = 0; index != tables.length; index++) {
    await TestClient[tables[index]].deleteMany({});
  }
};

export default RefreshDatabase;