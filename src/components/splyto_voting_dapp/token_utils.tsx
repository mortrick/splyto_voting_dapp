import {generateInsertQuery, executeQuery, convertEpochToTimestamp} from "./db_utils";




// Abble
// ENoD8J2J6wNHkcJkvVBkwq5JMiR1oNBfBZRkoHCQogyT
class Token {


  // Token Attributes
    token_name: string;
    token_symbol: string;
    token_age: Date;
    token_price_sol: number;
    token_price_usd: number;
    token_address: string;
    token_pair: string;
    is_sol: number;
    market_cap_usd: number;
    volume_24_usd: number;
    token_obj: {
      token_name: string,
      token_symbol: string,
      token_price_sol: number,
      token_price_usd: number,
      token_address: string,
      token_market_cap: number,
      token_daily_volumes:number,
      pairCreatedAt: Date
    };


  // Object builder 
    constructor() {
      this.token_name = "";
      this.token_symbol = "";
      this.token_age = new Date;
      this.token_price_sol = 0;
      this.token_price_usd = 0;
      this.token_address = "";
      this.token_pair = "";
      this.is_sol = 0;
      this.market_cap_usd = 0;
      this.volume_24_usd =0;
      this.token_obj = {
        token_name: '',
        token_symbol: '',
        token_price_sol: 0,
        token_price_usd: 0,
        token_address: '',
        token_market_cap: 0,
        token_daily_volumes:0,
        pairCreatedAt: new Date
      }};
      


      // Set Object 
    setTokenData(pairData: any): void {
        this.token_name = pairData.baseToken.name;
        this.token_symbol = pairData.baseToken.symbol;
        this.token_address = pairData.baseToken.address;
        this.token_pair = pairData.pairAddress;
        this.token_price_sol = parseFloat(pairData.priceNative);
        this.token_price_usd = parseFloat(pairData.priceUsd);
        this.token_age = convertEpochToTimestamp(pairData.pairCreatedAt);
        this.market_cap_usd = pairData.liquidity?.usd || 0;
        this.volume_24_usd = pairData.volume?.h24 || 0;
        
        // Check if the base token is SOL
        this.is_sol = pairData.baseToken.symbol === "SOL" ? 1 : 0;
    
        // Convert timestamp to a readable date format
        this.token_age = new Date(pairData.pairCreatedAt);
        this.token_obj = {
          token_name: this.token_name,
          token_symbol: this.token_symbol,
          token_price_sol: this.token_price_sol,
          token_price_usd: this.token_price_usd,
          token_address: this.token_address,
          token_market_cap: this.market_cap_usd,
          token_daily_volumes: this.volume_24_usd,
          pairCreatedAt: this.token_age
        }

    // Set string return from obj

      }

      introduce(): string {
        return `Token Name: ${this.token_name}
    Token Symbol: ${this.token_symbol}
    Token SOL Price: ${this.token_price_sol}
    Token USD Price: ${this.token_price_usd}
    Token Address: ${this.token_address}
    Token Age: ${this.token_age}`;
      }





    async get_token_stats(address: string): Promise<any> {
     try {
          const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${address}`);
          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }
          const data = await response.json();

          if (data && data.pair) {
            this.setTokenData(data.pair);
            const insert_qry = generateInsertQuery(this.token_obj)
            console.log(`Executing the query ${insert_qry}`);
            executeQuery(insert_qry)

          } else {
            console.error("Pair data not found.");
          }
          
        } catch (error) {
          console.error("Error fetching token stats:", error);
          return null;
        }
    }

    // async get_sol_stats(): Promise<any> {
    //     try {
    //       const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2`);
    //       if (!response.ok) {
    //         throw new Error(`HTTP Error: ${response.status}`);
    //       }
    //       const data = await response.json();

    //       if (data && data.pair) {
    //         this.setTokenData(data.pair);
            
    //       } else {
    //         console.error("Pair data not found.");
    //       }
          
    //     } catch (error) {
    //       console.error("Error fetching token stats:", error);
    //       return null;
    //     }
    //   }

  }
  
  

  // Example Usage
//   const myToken = new Token();
//   myToken.get_token_stats("58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2").then((data) => {
// console.log(`
//         Token Name  ${myToken.token_name}
//         Token Symbol  ${myToken.token_symbol}
//         Token Address  ${myToken.token_address}
//         Token pair  ${myToken.token_pair}
//         Token price sol  ${myToken.token_price_sol}
//         Token Price Usd  ${myToken.token_price_usd}
//         Token  Age  ${myToken.token_age}
//         Market Cap USD  ${myToken.market_cap_usd}
//         Volume_24_usd ${myToken.volume_24_usd}
//         `);
//     console.log(data)

//   });
  
 



  const myToken = new Token();
  myToken.get_token_stats("58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2").then((data) => {
    
  });
 

//  async get_token_stats(address: string): Promise<string>  {
//     const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/' + address)
//         method: 'GET',
//         headers: {},
//     });
//     const data = await response.json();
//     return data;
// }


    

// const get_sol_rate = async() =>{
//     const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2', {
//         method: 'GET',
//         headers: {},
//     });
//     const data = await response.json();
//     console.log(data)
//     return data 
// }


// const get_mint_data = async() =>{
//     const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/DLUNTKRQt7CrpqSX1naHUYoBznJ9pvMP65uCeWQgYnRK', {
//         method: 'GET',
//         headers: {},
//     });
//     const data = await response.json();
//     console.log(data)
//     return data 
// }
// const get_spl_rate = async(token_pair: string) =>{
//     const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/' + token_pair, {
//         method: 'GET',
//         headers: {},
//     });
//     const data = await response.json();
//     console.log(data)
//     return data 
// }



// const tokenStats = await get_token_stats("ENoD8J2J6wNHkcJkvVBkwq5JMiR1oNBfBZRkoHCQogyT")
// console.log(tokenStats)

// get_sol_rate()






// let solcaard =get_spl_rate("AmrNQgMdJyqo18SmvJXrdYcCC1XcZCrYENHNj1gsvKC")


// const mint_data = get_mint_data()



