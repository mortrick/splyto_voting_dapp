import pg from "pg";
const { Pool } = pg;


const connection = {
    user: "user_write",
    host: "localhost",
    database: "postgres",
    password: "write123",
    port: 5432
}


const pool = new Pool(connection)


export function generateInsertQuery(token: {
    token_name: string;
    token_symbol: string;
    token_price_sol: number;
    token_price_usd: number;
    token_address: string;
    token_market_cap: number;
    token_daily_volumes: number;
    pairCreatedAt: Date;
  }): string {

    const insert_qry = `
      INSERT INTO texas_db.dim_spl_tokens (
        Token_name, Token_Symbol, Token_Price_Sol, Token_Price_Usd, 
        Token_Address, Token_Age, Token_Market_Cap, Token_Daily_Volumes
      ) VALUES (
        '${token.token_name.replace(/'/g, "''")}', -- Escape single quotes
        '${token.token_symbol.replace(/'/g, "''")}',
        ${token.token_price_sol},
        ${token.token_price_usd},
        '${token.token_address.replace(/'/g, "''")}',
        '${new Date(token.pairCreatedAt).toISOString()}', -- Automatically set the token age
        ${token.token_market_cap},
        ${token.token_daily_volumes}
      );
    `;
    
    return insert_qry
  }
  
  



  export async function executeQuery(query: string): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query(query);
      console.log("✅ Data inserted successfully!");
    } catch (error) {
      console.error("❌ Error executing query:", error);
    } finally {
      client.release();
    }
  }







//   export function convertEpochToTimestamp(epochTime: number): string {
//     const date = new Date(epochTime);
//     return date.toISOString(); // Returns in UTC format: "YYYY-MM-DDTHH:mm:ss.sssZ"
//   }


  export function convertEpochToTimestamp(epochTime: number): Date {
    return new Date(epochTime);
  }
