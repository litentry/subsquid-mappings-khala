import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingPayoutStartedEvent as KusamaStakingPayoutStartedEvent
} from '../../types/kusama/events';
import { decodeAddress } from '../../utils';


export function getStakingPayoutStartedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {eraIndex: number, stash: string} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingPayoutStartedEvent(ctx);

      const [eraIndex, stash] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        eraIndex,
        stash: decodeAddress(stash)
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}