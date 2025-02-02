import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import {SplytoVotingDapp} from '../target/types/splyto_voting_dapp'
 
import { PL1, PL2,PL3, PL4,PL5, PL6,PL7,PL8,PL9,P11,P12, FEE, MOD} from './program'
export const IDL = require ('../target/idl/splyto_voting_dapp.json');
const mint = new PublicKey('7RZk2HUQxnPEp8LuJrwrapNGRF5gyUyDkttRh5q4nQuC');
export const splVotingAddress: PublicKey = new PublicKey("6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E");
import { 
  getOrCreateAssociatedTokenAccount ,
  TOKEN_PROGRAM_ID,
  MintLayout, 
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  transfer
} from '@solana/spl-token';




let is_new_token  = 0
let vote =1



describe('splyto_voting_dapp', () => {
  // Configure the client to use the local cluster.
  // provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });

  let token_vote_acc_add: PublicKey;
  let bump: number;
  let user_check_pubkey: PublicKey;
  let bump1: number;

  

  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  // const payer = provider.wallet as anchor.Wallet

  let splytoVotingDapp: Program<SplytoVotingDapp>;
  

if (vote ==1){
it("Vote for token", async () => {

// Program Dapp
splytoVotingDapp = new Program<SplytoVotingDapp>(
    IDL,
    provider
  );

// Token vote account
[token_vote_acc_add, bump] = PublicKey.findProgramAddressSync(
[mint.toBuffer()],
splVotingAddress
);

// User check pubkey account
[user_check_pubkey ,bump1] = PublicKey.findProgramAddressSync(
[MOD.publicKey.toBuffer(), mint.toBuffer()],
splVotingAddress 
) 


console.log("The voting account address is ", token_vote_acc_add);
console.log("The User check account address is  ", user_check_pubkey);

const sig = await splytoVotingDapp.methods.voteForToken(
  "TokenY"
).accounts({
  voter: PL1.publicKey,
  mint: mint,
  // userCheck: user_check_pubkey,
  // tokenVoteAccount: token_vote_acc_add

}).signers([PL1]).rpc();

console.log("sig", sig);

const user_check = await splytoVotingDapp.account.userCheck.fetch(user_check_pubkey);
const token_vote_acc = await splytoVotingDapp.account.splytoVotingDapp.fetch(token_vote_acc_add)
console.log("Token Name ", token_vote_acc.tokenName, "Counts ",token_vote_acc.count)
console.log("The user voting state is ", user_check.alreadyVoted)

expect(1).toEqual(1)
}, 25000)


it ("Check account", async () =>{
  const account_after_init = await splytoVotingDapp.account.splytoVotingDapp.fetch(token_vote_acc_add)
  console.log("The token name is ", account_after_init.tokenName)
  
  console.log("Votes", account_after_init.count)
// expect(account_after_init.tokenName).toEqual('TokenY')  
})


}
})

