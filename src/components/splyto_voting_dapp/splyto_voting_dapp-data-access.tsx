import { getSplytoVotingDappProgram, getSplytoVotingDappProgramId } from '@project/anchor'
import { useConnection , useWallet} from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'
import { PL1, PL2,PL3, PL4,PL5, PL6,PL7,PL8,PL9,P11,P12, MOD} from './utils'





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

  const vote_for_token = useMutation({
    mutationKey: ['splyto_voting_dapp', 'vote_for_token', { cluster }],
    mutationFn: async ({ token_name, token_mint }: { token_name: string; token_mint: PublicKey }) => {
      const voter = current_wallet.publicKey;
      if (!voter) {
        throw new Error("Wallet is not connected");
      }
  
      return await program.methods
        .voteForToken(token_name)
        .accounts({ 
          voter: voter,
          mint: token_mint
        })
        .signers([])
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });
  

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    vote_for_token,
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
