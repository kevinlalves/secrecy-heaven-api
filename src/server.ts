import { fetchEnv } from './utils/functions';
import app, { init } from '@/app';

const port = parseInt(fetchEnv('PORT', '4000'));

init().then(() => {
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}.`);
  });
});
