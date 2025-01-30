import { getSplytoVotingDappProgram, getSplytoVotingDappProgramId } from '@project/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import { useWallet } from '@solana/wallet-adapter-react';
import {getUserTokensAccount} from './utils';
export const splVotingAddress: PublicKey = new PublicKey("6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E");
const mint = new PublicKey('9kXBvCNrXoVRU1M1z1AfxVoAeLCdCHicTwjYymVTDH6v');


export function useSplytoVotingDappProgram() {
  const user_wallet = useWallet()
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

  const getAccount = useQuery({
    queryKey: ['voting', 'getVotingDapp', { cluster }],
    queryFn: async ({ queryKey }) => {
      const [, , { tokenAccountPubkey }] = queryKey as [string, string, { tokenAccountPubkey: PublicKey }];
      let res = await program.account.splytoVotingDapp.fetch(tokenAccountPubkey);
      return res
    }
       });
  

  const vote = useMutation({
    mutationKey: ['splyto_voting_dapp', 'vote', cluster],
    mutationFn: async ({ name, mint_param }: { name: string, mint_param: PublicKey| undefined }) => {
      if (!user_wallet.connected || !user_wallet.publicKey ){
      console.log("Please connect wallet ")
    }else 
    {
      let [mint_pda,b,wallet_ata,d] = getUserTokensAccount(mint_param,user_wallet.publicKey);
      try {
        if (mint_param != undefined && wallet_ata !=undefined && mint_pda){
        let sig = await program.methods.voteForToken(name).accounts({
          voter: user_wallet.publicKey,
          mint: mint_param,
          userCheck: wallet_ata, // Added missing account
          tokenVoteAccount: mint_pda, // Ensure this is correctly derived
        }).signers([]).rpc();
        console.log("Transaction Signature:", sig);
      }
        
      } catch (error) {
        console.error("Voting failed:", error);
      }
 
    }
    },
  });
 
  return {
    program,
    programId,
    accounts,
    getProgramAccount,vote

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

  const closeMutation = useMutation({
    mutationKey: ['splyto_voting_dapp', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ splytoVotingDapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })





  return {
    accountQuery,
    closeMutation,
  }
}
