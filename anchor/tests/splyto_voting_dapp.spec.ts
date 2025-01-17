import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import {SplytoVotingDapp} from '../target/types/splyto_voting_dapp'
 
import { PL1, PL2,PL3, PL4,PL5, PL6,PL7,PL8,PL9,P11,P12, FEE, MOD} from './program'
export const IDL = require ('../target/idl/splyto_voting_dapp.json');
const mint = new PublicKey('9kXBvCNrXoVRU1M1z1AfxVoAeLCdCHicTwjYymVTDH6v');
export const splVotingAddress: PublicKey = new PublicKey("6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E");






let is_new_token  = 0
let vote =0



describe('splyto_voting_dapp', () => {
  // Configure the client to use the local cluster.
  // provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });

  let token_vote_acc_add: PublicKey;
  let bump: number;
  let user_check_pubkey: PublicKey;
  let bump1: number;

  let new_mints: PublicKey[] = []

  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  let splytoVotingDapp: Program<SplytoVotingDapp>;
  const program = anchor.workspace.SplytoVotingDapp as Program<SplytoVotingDapp>

beforeAll(async () => {

splytoVotingDapp = new Program<SplytoVotingDapp>(
      IDL,
      provider
    );
[token_vote_acc_add, bump] = PublicKey.findProgramAddressSync(
  [mint.toBuffer()],
  splVotingAddress
);
 [user_check_pubkey ,bump1] = PublicKey.findProgramAddressSync(
  [MOD.publicKey.toBuffer(), mint.toBuffer()],
  splVotingAddress
)
  
})


  // const splyto_voting_dappKeypair = Keypair.generate()

  it("Create 5 new tokens", async () => {

    // for(let i =0;i <5;i++){

        try{
        let new_mint = Keypair.generate();
    const sig = await splytoVotingDapp.methods.createMint(2).accounts({
    mintAuthority: MOD.publicKey,
    payer: MOD.publicKey   
  }).signers([MOD]).rpc();

        
    }
    catch(err){
      console.log("Error: ",err)
    }
  // }
    

  },25000)










if (vote ==1){
it("Vote for token", async () => {

const sig = await splytoVotingDapp.methods.voteForToken(
  "TokenY"
).accounts({
  voter: MOD.publicKey,
  mint: mint,
  userCheck: user_check_pubkey,
  tokenVoteAccount: token_vote_acc_add

}).signers([MOD]).rpc();

console.log("sig", sig);

const user_check = await splytoVotingDapp.account.userCheck.fetch(user_check_pubkey);
const token_vote_acc = await splytoVotingDapp.account.splytoVotingDapp.fetch(token_vote_acc_add)
console.log("Token Name ", token_vote_acc.tokenName, "Counts ",token_vote_acc.count)
console.log("The user voting state is ", user_check.alreadyVoted)


// const sig2 = await splytoVotingDapp.methods.voteForToken().accounts({
//   voter: MOD.publicKey,
//   mint: mint
// }).signers([MOD]).rpc()



}, 25000)


it ("Check account", async () =>{
  const account_after_init = await splytoVotingDapp.account.splytoVotingDapp.fetch(token_vote_acc_add)
  console.log("The token name is ", account_after_init.tokenName)
  console.log("Votes", account_after_init.count)
})


}
  // it('Increment SplytoVotingDapp', async () => {
  //   await program.methods.increment().accounts({ splytoVotingDapp: splyto_voting_dappKeypair.publicKey }).rpc()

  //   const currentCount = await program.account.splytoVotingDapp.fetch(splyto_voting_dappKeypair.publicKey)

  //   expect(currentCount.count).toEqual(1)
  // })


  // it('Set close the splyto_voting_dapp account', async () => {
  //   await program.methods
  //     .close()
  //     .accounts({
  //       payer: payer.publicKey,
  //       splytoVotingDapp: splyto_voting_dappKeypair.publicKey,
  //     })
  //     .rpc()

  //   // The account should no longer exist, returning null.
  //   const userAccount = await program.account.splytoVotingDapp.fetchNullable(splyto_voting_dappKeypair.publicKey)
  //   expect(userAccount).toBeNull()
  // })
})
