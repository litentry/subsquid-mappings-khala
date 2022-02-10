import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateAccount,
  SubstrateCrowdloanContribution,
  SubstrateNetwork,
} from '../model';
import { encodeAddress, getRegistry } from '../utils/registry';
import { CrowdloanContributedEvent } from '../types/polkadot/events';
import { getOrCreate } from '../utils/store';
import getAccountHex from '../utils/getAccountHex';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);

    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];
    const prefix = getRegistry(network).prefix;

    const { amount, paraId, address: rawAddress } = getContributedEvent(ctx);

    const address = encodeAddress(network, rawAddress);
    const rootAccount = getAccountHex(rawAddress);

    const account = await getOrCreate(ctx.store, SubstrateAccount, address);
    account.rootAccount = rootAccount;
    account.network = network;
    account.prefix = prefix;
    account.totalCrowdloanContributions =
      (account.totalCrowdloanContributions || 0) + 1;
    await ctx.store.save(account);

    const contribution = new SubstrateCrowdloanContribution({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      date,
      symbol,
      decimals,
      amount,
      paraId,
      account,
      rootAccount,
    });

    await ctx.store.save(contribution);
  };

interface ContributedEvent {
  address: Uint8Array;
  paraId: number;
  amount: bigint;
}

function getContributedEvent(ctx: EventHandlerContext): ContributedEvent {
  const event = new CrowdloanContributedEvent(ctx);

  if (event.isV9110) {
    const [address, paraId, amount] = event.asV9110;
    return { address, paraId, amount };
  } else {
    const [address, paraId, amount] = event.asLatest;
    return { address, paraId, amount };
  }
}