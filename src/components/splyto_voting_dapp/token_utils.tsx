
// Abble
// ENoD8J2J6wNHkcJkvVBkwq5JMiR1oNBfBZRkoHCQogyT
const get_token_stats = async (address: string) => {
    const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/' + address, {
        method: 'GET',
        headers: {},
    });
    const data = await response.json();
    return data
}





const get_sol_rate = async() =>{
    const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2', {
        method: 'GET',
        headers: {},
    });
    const data = await response.json();
    console.log(data)
    return data 
}



// const tokenStats = await get_token_stats("ENoD8J2J6wNHkcJkvVBkwq5JMiR1oNBfBZRkoHCQogyT")
// console.log(tokenStats)

get_sol_rate()

