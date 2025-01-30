import { PublicKey } from "@solana/web3.js"

export const splVotingAddress: PublicKey = new PublicKey("6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E");






export function getUserTokensAccount(new_mint: PublicKey | undefined,wallet_pubkey: PublicKey):[PublicKey | undefined ,number | undefined , PublicKey| undefined ,number| undefined ]{

    // Create/ Get the mint voting ATA 
    if(new_mint != undefined){
    let [new_mint_address ,mint_bump] = PublicKey.findProgramAddressSync(
        [new_mint.toBuffer()],
        splVotingAddress
      )
      let [wallet_ata ,ata_bump] = PublicKey.findProgramAddressSync(
        [wallet_pubkey.toBuffer()],
        splVotingAddress
      )
    return [new_mint_address, mint_bump, wallet_ata, ata_bump]
    }
    else {
        return [undefined,undefined,undefined,undefined]
    }
    // // The mint address created 
    // Create/ Get user check account 
    }