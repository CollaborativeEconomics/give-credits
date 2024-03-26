import { CronJob } from 'cron';
import { runHook, Triggers } from '@cfce/registry-hooks'
import { getOrganizations } from 'utils/registry';

const job = new CronJob('00 00 00 * * *', 
  async () => {
    console.log('Running scheduled mint task');


    let organizations: any[] = await getOrganizations();

    let organizationIds = organizations.map((organization) => organization.id);
  
    try {
      for (let i = 0; i < organizationIds.length; i++) {
        await runHook(Triggers.onceDaily, organizationIds[i], {});
      } 
    } catch (error) {
      console.error('Mint task failed:', error);
    }
  },
  null, // onComplete
  true, // start
  'America/Los_Angeles'
);