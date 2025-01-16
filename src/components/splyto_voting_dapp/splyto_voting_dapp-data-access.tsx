import { getSplytoVotingDappProgram, getSplytoVotingDappProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useSplytoVotingDappProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSplytoVotingDappProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getSplytoVotingDappProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['splyto_voting_dapp', 'all', { cluster }],
    queryFn: () => program.account.splyto_voting_dapp.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['splyto_voting_dapp', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ splyto_voting_dapp: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSplytoVotingDappProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSplytoVotingDappProgram()

  const accountQuery = useQuery({
    queryKey: ['splyto_voting_dapp', 'fetch', { cluster, account }],
    queryFn: () => program.account.splyto_voting_dapp.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['splyto_voting_dapp', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ splyto_voting_dapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['splyto_voting_dapp', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ splyto_voting_dapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['splyto_voting_dapp', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ splyto_voting_dapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['splyto_voting_dapp', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ splyto_voting_dapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
