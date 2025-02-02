import axios from "axios";

const DEX_SCREENER_API = "https://api.dexscreener.com/latest/dex/pairs/solana/58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2";

/**
 * Fetches the latest SOL/USDC price from DEX Screener.
 * @returns {Promise<number | null>} The latest SOL/USDC price or null if an error occurs.
 */
export async function getSolanaUsdcPrice(): Promise<number | null> {
  try {
    const response = await axios.get(`${DEX_SCREENER_API}`);
    
    if (response.data && response.data.pairs) {
      // Find the SOL/USDC pair
      const solUsdcPair = response.data.pairs.find((pair: any) => 
        pair.baseToken.symbol === "SOL" && pair.quoteToken.symbol === "USDC"
      );

      if (solUsdcPair) {
        return parseFloat(solUsdcPair.priceUsd);
      }
    }

    console.error("SOL/USDC pair not found");
    return null;
  } catch (error) {
    console.error("Error fetching SOL/USDC price:", error);
    return null;
  }
}

// Example usage
getSolanaUsdcPrice().then((price) => {
  if (price) {
    console.log(`Latest SOL/USDC Price: $${price}`);
  } else {
    console.log("Failed to fetch SOL/USDC price.");
  }
});
