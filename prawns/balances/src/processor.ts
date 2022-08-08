import { KnownArchives, lookupArchive } from '@subsquid/archive-registry';
import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import balanceSetHandler from './handlers/balances.balanceset.event';
import balanceDepositHandler from './handlers/balances.deposit.event';
import balanceEndowedHandler from './handlers/balances.endowed.event';
import balanceTransferHandler from './handlers/balances.transfer.event';
import treasuryAwardedHandler from './handlers/treasury.awarded.event';
import { SubstrateNetwork } from './model';

const supportedNetworks = ['kusama', 'polkadot'];
const network: SubstrateNetwork = process.env.NETWORK as SubstrateNetwork;

if (!supportedNetworks.includes(network)) {
  throw Error('Network not supported');
}

const processor = new SubstrateProcessor(new TypeormDatabase());

processor.setTypesBundle(network);
processor.setBatchSize(500);
processor.setDataSource({
  archive: lookupArchive(network as KnownArchives, { release: 'FireSquid' }),
});

processor.addEventHandler(
  'Balances.Transfer',
  balanceTransferHandler(network, 0)
);
processor.addEventHandler('Balances.BalanceSet', balanceSetHandler(network, 0));
processor.addEventHandler(
  'Balances.Endowed',
  balanceEndowedHandler(network, 0)
);
processor.addEventHandler(
  'Balances.Deposit',
  balanceDepositHandler(network, 0)
);
processor.addEventHandler(
  'Treasury.Awarded',
  treasuryAwardedHandler(network, 0)
);

processor.run();