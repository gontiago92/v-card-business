import fs from "node:fs"
import metadata from "~/server/data.json";
export default defineEventHandler((event) => {

  const file = "server/data.json"

  let rawdata = fs.readFileSync(file);
  let data = JSON.parse(rawdata);

  return data
})
