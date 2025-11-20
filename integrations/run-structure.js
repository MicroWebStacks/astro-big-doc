import { config } from '../config.js';
import { collect } from 'content-structure';

async function main() {
  const collectConfig = config.collect_content;

  console.log("content-structure standalone runner: starting collect()");
  await collect(collectConfig);
  console.log("content-structure standalone runner: collect() finished");

}

main().catch((err) => {
  console.error("content-structure standalone runner: error", err);
  process.exit(1);
});
