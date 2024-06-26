import { TestClient } from "./clients";
import { type Table } from "./tables";

const RefreshDatabase = async (tables: Table[]) => {
  tables.forEach(async (table: Table) => {
    await TestClient[table].deleteMany({});
  });
};

export default RefreshDatabase;