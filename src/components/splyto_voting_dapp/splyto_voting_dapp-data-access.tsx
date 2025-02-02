import { getSplytoVotingDappProgram, getSplytoVotingDappProgramId } from '@project/anchor'
import { useConnection , useWallet} from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as anchor from '@coral-xyz/anchor'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'
import { PL1, PL2,PL3, PL4,PL5, PL6,PL7,PL8,PL9,P11,P12, MOD} from './utils'



// const new_mint = new PublicKey("4pqgB8YY8u8LnFA9AcsWUKFNbeo2SmZK89A62gWNZCFN")
export function useSplytoVotingDappProgram() {
const current_wallet =useWallet()
const new_mint = new PublicKey("DiQXEvkZTigzsRebyAYe5xygArG3hHQ4ksUWXSHMs3XU");


  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSplytoVotingDappProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getSplytoVotingDappProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['splyto_voting_dapp', 'all', { cluster }],
    queryFn: () => program.account.splytoVotingDapp.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const getPoleAccount = useMutation({
    mutationKey: ['splyt_voting_dapp', 'fetchAccount', { cluster }],
    mutationFn: async (accountPublicKey: PublicKey) => {
      return await program.account.splytoVotingDapp.fetch(accountPublicKey);
    },
  });

  const VoteForToken = useMutation({
    mutationKey: ['splyto_voting_dapp', 'vote_for_token', { cluster }],
    mutationFn: async ({ token_name, token_mint }: { token_name: string; token_mint: PublicKey }) => {
      const voter = current_wallet.publicKey;
      if (!voter) {
        throw new Error("Wallet is not connected");
      }
  
      // ✅ Derive PDA addresses (same as test file)
      const [tokenVoteAccountPDA, tokenVoteBump] = PublicKey.findProgramAddressSync(
        [token_mint.toBuffer()],
        programId
      );
  
      const [userCheckPDA, userCheckBump] = PublicKey.findProgramAddressSync(
        [voter.toBuffer(), token_mint.toBuffer()],
        programId
      );
  
      console.log("⏳ Submitting Vote Transaction...");
      console.log("🔑 Voter: ", voter.toBase58());
      console.log("🗳️ Token Name: ", token_name);
      console.log("🧩 Token Mint: ", token_mint.toBase58());
      console.log("📌 Token Vote Account PDA: ", tokenVoteAccountPDA.toBase58(), " (Bump: ", tokenVoteBump, ")");
      console.log("👤 User Check PDA: ", userCheckPDA.toBase58(), " (Bump: ", userCheckBump, ")");
  
      try {
       const sig = await program.methods.voteForToken('TokenY').accounts({
        voter: voter,
        mint: new_mint
       }).signers([]).rpc()
        console.log("✅ Vote submitted successfully! Signature:", sig);
  
        return sig;
      } catch (error) {
        console.error("❌ Error Voting:", error);
        throw error;
      }
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to vote'),
  });
  
  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    VoteForToken,
    getPoleAccount
  }
}

export function useSplytoVotingDappProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSplytoVotingDappProgram()

  const accountQuery = useQuery({
    queryKey: ['splyto_voting_dapp', 'fetch', { cluster, account }],
    queryFn: () => program.account.splytoVotingDapp.fetch(account),
  })


  

  // const closeMutation = useMutation({
  //   mutationKey: ['splyto_voting_dapp', 'close', { cluster, account }],
  //   mutationFn: () => program.methods.close().accounts({ splyto_voting_dapp: account }).rpc(),
  //   onSuccess: (tx) => {
  //     transactionToast(tx)
  //     return accounts.refetch()
  //   },
  // })



  return {
    accountQuery,
    accounts,
    // closeMutation
  }
}
