import {Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram} from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';

// import fs from 'fs'
// import { AnchorProvider } from '@project-serum/anchor';

const theDapokerAddress: PublicKey = new PublicKey("6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E");





const Mod_content = JSON.parse("[226,48,75,250,105,48,33,122,134,106,144,207,176,125,90,107,246,53,68,143,220,248,42,83,178,58,216,124,249,212,215,80,5,45,170,110,185,4,243,2,53,92,97,59,135,82,227,118,143,190,163,196,152,42,59,183,64,38,8,171,119,222,33,63]");
const PL1_content = JSON.parse("[1,161,106,119,133,156,244,137,241,139,81,175,111,112,163,243,61,22,220,80,216,115,155,67,162,131,209,158,169,35,178,194,5,184,69,8,110,114,109,12,201,234,240,238,207,165,188,67,162,157,172,230,0,230,81,40,205,255,196,244,156,23,219,193");
const PL2_content = JSON.parse("[11,220,64,33,24,1,112,195,213,201,203,169,254,128,51,176,107,159,72,164,227,192,113,164,61,0,102,237,37,38,181,43,5,184,74,115,35,33,21,155,46,156,70,231,39,53,14,219,207,167,161,214,27,114,93,166,86,88,58,117,247,211,54,211]");
const PL3_content = JSON.parse("[42,143,84,3,101,3,200,76,86,223,122,173,162,37,134,5,255,85,173,180,209,237,207,57,160,23,118,63,46,116,194,36,5,184,80,37,127,246,61,86,170,23,215,177,225,43,147,126,163,126,162,33,58,254,144,231,99,177,125,58,177,28,223,16]");
const PL4_content = JSON.parse("[105,73,15,84,100,170,218,186,77,110,155,210,44,10,223,250,100,79,18,243,212,76,237,213,152,113,7,239,177,68,28,230,5,184,84,183,184,232,214,114,98,168,138,55,169,127,53,100,223,168,210,157,154,254,57,184,140,109,216,236,102,114,152,41]");
const PL5_content = JSON.parse("[111,38,44,22,132,102,96,51,173,144,128,206,24,243,43,182,202,26,228,220,17,127,218,233,92,124,0,246,46,122,202,185,5,184,88,16,197,187,46,236,150,81,177,254,78,23,43,143,112,3,143,161,242,74,136,228,12,99,178,138,101,98,54,82]");
const PL6_content = JSON.parse("[239,37,100,44,202,71,77,194,158,25,103,59,249,49,17,73,239,40,192,242,103,126,224,242,99,190,114,32,255,226,65,193,5,184,92,29,40,164,7,210,2,195,214,85,255,243,236,161,136,11,148,188,157,24,50,222,4,136,109,96,43,31,198,153]");
const PL7_content = JSON.parse("[96,79,53,42,153,138,13,89,208,66,66,36,251,50,134,107,121,2,142,220,232,235,122,229,35,214,89,104,232,244,114,196,5,184,97,239,189,152,162,45,68,172,181,8,172,27,242,22,233,204,5,71,122,241,182,96,83,250,126,184,61,17,172,16]");
const PL8_content = JSON.parse("[130,89,92,57,140,33,106,156,163,39,253,248,175,14,65,215,18,133,52,207,85,13,184,77,191,123,160,144,144,8,121,2,5,184,102,237,245,82,138,133,55,89,125,185,142,130,92,199,185,65,195,0,151,139,24,126,2,92,227,157,139,98,89,56]");
const PL9_content = JSON.parse("[95,112,18,246,180,3,18,41,167,253,221,206,249,18,91,149,233,41,74,66,14,251,46,228,204,10,83,186,147,163,86,91,5,184,110,222,99,192,28,121,237,38,15,160,179,204,25,111,12,134,37,190,228,160,217,59,53,139,121,127,151,148,54,207]");
const P11_content = JSON.parse("[74,236,228,69,205,140,51,137,245,24,190,149,167,109,200,176,163,70,177,94,127,69,242,199,112,74,95,233,187,191,74,131,5,162,203,67,137,250,159,196,195,22,4,141,113,220,0,233,237,80,103,61,230,10,166,92,37,127,116,249,83,71,172,78]");
const P12_content = JSON.parse("[141,21,227,237,67,91,180,235,134,103,21,108,98,190,185,184,145,88,164,157,190,147,135,223,200,75,240,156,98,48,57,51,5,162,205,211,112,117,42,115,120,46,159,90,165,154,82,238,246,42,95,38,127,211,93,233,177,97,255,204,110,56,205,130]");

export const PL1 = Keypair.fromSecretKey(Uint8Array.from(PL1_content));
export const PL2 = Keypair.fromSecretKey(Uint8Array.from(PL2_content));
export const PL3 = Keypair.fromSecretKey(Uint8Array.from(PL3_content));
export const PL4 = Keypair.fromSecretKey(Uint8Array.from(PL4_content));
export const PL5 = Keypair.fromSecretKey(Uint8Array.from(PL5_content));
export const PL6 = Keypair.fromSecretKey(Uint8Array.from(PL6_content));
export const PL7 = Keypair.fromSecretKey(Uint8Array.from(PL7_content));
export const PL8 = Keypair.fromSecretKey(Uint8Array.from(PL8_content));
export const PL9 = Keypair.fromSecretKey(Uint8Array.from(PL9_content));
export const P11 = Keypair.fromSecretKey(Uint8Array.from(P11_content));
export const P12 = Keypair.fromSecretKey(Uint8Array.from(P12_content));
export const MOD = Keypair.fromSecretKey(Uint8Array.from(Mod_content));




// moderator 
let wallets: Keypair[] = [MOD, PL1, PL2, PL3, PL4, PL5, PL6, PL7, PL8, PL9,P11, P12]



// Create the context of 5 wallets to be able to deposit to the table 
function get_wallet_context_for_bank_run(keypairArr: Keypair[]): any  {
    let returned_wallets_context = [] 
    for(let i=0; i<keypairArr.length; i++){
      let wallet_context = {
        address: keypairArr[i].publicKey,
        info: {
          lamports: 5_000_000_000,
          data: Buffer.alloc(0),
          owner: SystemProgram.programId,
          executable: false
        }
      };
    returned_wallets_context.push(wallet_context)
    }
    return returned_wallets_context
    }
    
export const  wallets_context = get_wallet_context_for_bank_run(wallets)




export function get_seed(first_word: String, order_id: Number, daPoker_Address: PublicKey): [PublicKey, number]{
    const  [daPokerPdaAddress, seed_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(first_word),
          new anchor.BN(Number(order_id)).toArrayLike(Buffer, "le",8)
        ],
        daPoker_Address
    )
    console.log(`PDA: ${daPokerPdaAddress}`);
    console.log(`bump: ${seed_bump}`);
        return [daPokerPdaAddress, seed_bump]
}



// export async function init_table(
    
//     wallet: Keypair,
//     run_id: number,
//     order_amount_lamports: number,
//     pdaOrder: anchor.web3.PublicKey
// ) {
//     const context = await startAnchor("",[{name: "thedapoker", programId: theDapokerAddress}],wallets_context)
//     const provider = new BankrunProvider(context)
//     const storeProgram = new Program<Thedapoker>(
//     IDL,
//     provider
//   );
//     console.log(`wallet.publicKey is ${wallet.publicKey}`);

//     // Call the `tableInit` method
//     const sig = await storeProgram.methods
//         .tableInit(new anchor.BN(run_id), new anchor.BN(order_amount_lamports))
//         .accounts({
//             moderator: wallet.publicKey,
//         })
//         .signers([wallet])
//         .rpc();

//     // Debug Section
//     console.log("Sig:", sig);
//     console.log(`The created PDA address should be ${pdaOrder}`);

//     // Fetch order data
//     const order_data = await storeProgram.account.table.fetch(pdaOrder);
//     const order_info = await storeProgram.account.table.getAccountInfo(pdaOrder);
//     let order_account_lamports = order_info?.lamports;

//     // Print debug information
//     console.log(`
// The balance lamports of the order is ${order_account_lamports}
// OrderId: ${order_data.runId}
// OrderAmount: ${order_data.tableDepositLamports}
// UserOrder: ${order_data.moderator}
//     `);

//     // Return useful data if needed
//     return {
//         sig,
//         order_data,
//         order_account_lamports,
//     };
// }






// export async function deposit_to_table(
//     wallet: Keypair,
//     order_id: number,
//     pdaOrder: anchor.web3.PublicKey
// ) {
//     const context = await startAnchor("",[{name: "thedapoker", programId: theDapokerAddress}],wallets_context)
//     const provider = new BankrunProvider(context)
//     const storeProgram = new Program<Thedapoker>(
//     IDL,
//     provider
//   );
//     console.log(`wallet.publicKey is ${wallet.publicKey}`);

//     // Check lamports before deposit
//     const wallet_balance_before = await provider.connection.getAccountInfo(wallet.publicKey);
//     console.log(`The balance of the wallet before the TX is ${wallet_balance_before?.lamports}`);

//     // Fetch the order data to determine the deposit amount
//     let order_data = await storeProgram.account.table.fetch(pdaOrder);
//     const order_amount_lamports = order_data.tableDepositLamports;
//     console.log(`The user needs to deposit ${order_amount_lamports} Lamports`);

//     // Perform the deposit
//     const sig = await storeProgram.methods
//         .tableDeposit(
//             new anchor.BN(order_id),
//             new anchor.BN(order_amount_lamports),
//             255
//         )
//         .accounts({
//             player: wallet.publicKey,
//         })
//         .signers([wallet])
//         .rpc();

//     // Debugging Section
//     console.log(`Buyer ${wallet.publicKey} deposited successfully \n sig: ${sig}`);

//     // Check wallet balance after the deposit
//     const wallet_balance_after = await provider.connection.getAccountInfo(wallet.publicKey);
//     console.log(`The balance of the wallet after the Transaction is ${wallet_balance_after?.lamports}`);

//     // Check the PDA data after the deposit
//     order_data = await storeProgram.account.table.fetch(pdaOrder);
//     console.log(`The status of the order is ${order_data.status}`);

//     // Return useful data if needed
//     return {
//         sig,
//         wallet_balance_before: wallet_balance_before?.lamports,
//         wallet_balance_after: wallet_balance_after?.lamports,
//         order_data,
//     };
// }


export function findPDAAndPrint(run_id: number, programId: PublicKey) {
    const seed = Buffer.from("table");
    const runIdBytes = new anchor.BN(run_id).toArrayLike(Buffer, "le", 8);
  
    const [pda, bump] = PublicKey.findProgramAddressSync(
      [seed, runIdBytes],
      programId
    );
  
    console.log("Seed Bytes in TypeScript:", [...seed, ...runIdBytes]);
    console.log("PDA in TypeScript:", pda.toBase58());
    console.log("Bump in TypeScript:", bump);
  }
  




  export function generateRunId(): number {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const runIdString = `${year}${month}${day}${hours}${minutes}${seconds}`;
    // const runIdnumber = Number(runIdString)
    return +runIdString; // Convert the string to a number
}










export interface Pole {
  token_name: string,
  counter: number
}
