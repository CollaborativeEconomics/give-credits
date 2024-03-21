import { CronJob } from 'cron';
import mint from './nft/mint';

const job = new CronJob('00 00 00 * * *', 
  async () => {
    console.log('Running scheduled mint task');
    try {
      const result = await mint('contractId', 'toAddress', 'uriToMetadata');
      console.log('Mint task completed:', result);
    } catch (error) {
      console.error('Mint task failed:', error);
    }
  },
  null, // onComplete
  true, // start
  'America/Los_Angeles'
);