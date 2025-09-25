// src/infrastructure/db.ts
import { Pool, type QueryResult, type QueryResultRow } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Devuelve el QueryResult completo (rows, rowCount, etc.)
export async function ejecutarConsulta<
  T extends QueryResultRow = QueryResultRow
>(texto: string, parametros?: any[]): Promise<QueryResult<T>> {
  return pool.query<T>(texto, parametros);
}

// Si prefieres devolver solo las filas tipadas:
export async function ejecutarFilas<
  T extends QueryResultRow = QueryResultRow
>(texto: string, parametros?: any[]): Promise<T[]> {
  const { rows } = await pool.query<T>(texto, parametros);
  return rows;
}
