import { hexToString, u8aToHex } from '@polkadot/util';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateTip } from '../model';
import { decodeAddress } from '../utils';
import { getTipsNewTipEvent } from './typeGetters/getTipsTipNewEvent';

const reportAwesomeName = 'tips.reportAwesome';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.extrinsic) {
      return;
    }
    
    const newTipEvent = getTipsNewTipEvent(ctx, network);
    const blockNumber = BigInt(ctx.block.height);
    const account = ctx.extrinsic.signer;
    const rootAccount = decodeAddress(account);

    const tipModel = new SubstrateTip({
      id: u8aToHex(newTipEvent.tipHash),
      account,
      rootAccount, 
      network,
      blockNumber,
      who: decodeAddress(ctx.extrinsic.args[1].value as string),
      finder: rootAccount,
      tipValue: ctx.extrinsic.args[2]?.value as bigint,
      reason: hexToString(ctx.extrinsic.args[0].value as string),
      deposit: BigInt(1),
    });

    await ctx.store.save(tipModel);
  };

function isReport(ctx: EventHandlerContext) {
  return ctx.event.name === reportAwesomeName;
}

