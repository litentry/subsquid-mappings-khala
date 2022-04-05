import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingBondedEvent as KusamaStakingBondedEvent
} from '../../types/kusama/events';
import { decodeAddress } from '../../utils';


export function getStakingBondedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {stash: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingBondedEvent(ctx);

      const [stash, amount] = event.isV1051 ? event.asV1051 : event.asLatest;

      return {
        stash: decodeAddress(stash),
        amount,
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}