import { config } from '../config.js';
import { collect } from 'content-structure';
import { create_menu } from './create_menu.js';

async function main() {
  const collectConfig = config.collect_content;

  console.log("content-structure standalone runner: starting collect()");
  await collect(collectConfig);
  console.log("content-structure standalone runner: collect() finished");
  console.log("content-structure standalone runner: starting create_menu()");
  await create_menu(collectConfig);
  console.log("content-structure standalone runner: create_menu() finished");

}

main().catch((err) => {
  console.error("content-structure standalone runner: error", err);
  process.exit(1);
});
