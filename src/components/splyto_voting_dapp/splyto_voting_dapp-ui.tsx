import { Keypair, PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { ellipsify } from '../ui/ui-layout'
import { useSplytoVotingDappProgram, useSplytoVotingDappProgramAccount } from './splyto_voting_dapp-data-access'
import { useWallet } from '@solana/wallet-adapter-react'

import { useTransactionToast } from '../ui/ui-layout'

export const splVotingAddress: PublicKey = new PublicKey("6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E");
const mint_constant = new PublicKey('9kXBvCNrXoVRU1M1z1AfxVoAeLCdCHicTwjYymVTDH6v');

export function SplytoVotingDapp({mint}: {mint: PublicKey| undefined}) {
  const { accounts, getProgramAccount, vote } = useSplytoVotingDappProgram();
  const current_wallet = useWallet();
  const [voteInput, setVoteInput] = useState('');

  const handleVote = async () => {
    if (!current_wallet.connected || !current_wallet.publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!voteInput.trim()) {
      alert('Please enter a valid token name');
      return;
    }

    try {
      await vote.mutateAsync({ name: voteInput, mint_param: mint });
      setVoteInput(''); // Reset input field after voting
    } catch (err) {
      console.error("Error voting: ", err);
    }
  };

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Enter token name to vote"
          value={voteInput}
          onChange={(e) => setVoteInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleVote}>
          Vote
        </button>
      </div>

      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <SplytoVotingDappCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          <p>No voting records found. Cast a vote to get started.</p>
        </div>
      )}
    </div>
  );
}

export function SplytoVotingDappCard({ account }: { account: PublicKey }) {
  const { accountQuery, closeMutation } = useSplytoVotingDappProgramAccount({ account });

  const count = useMemo(() => accountQuery.data?.count ?? 0, [accountQuery.data?.count]);

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2 className="card-title justify-center text-3xl cursor-pointer" onClick={() => accountQuery.refetch()}>
            {count}
          </h2>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink path={`account/${account}`} label={ellipsify(account.toString())} />
            </p>
            <button
              className="btn btn-xs btn-secondary btn-outline"
              onClick={() => {
                if (!window.confirm('Are you sure you want to close this account?')) {
                  return;
                }
                return closeMutation.mutateAsync();
              }}
              disabled={closeMutation.isPending}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
