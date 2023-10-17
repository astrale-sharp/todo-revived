import { Data } from "../src/interface.ts"
import { assert } from "https://deno.land/std@0.204.0/assert/mod.ts";



Deno.test("unique #1", () => {
  let d: Data  = new Data
  let y: Data  = new Data
  d.addList("My super list")
  d.addElemToList("My super list")
  d.addElemToList("My super list")
  console.log(d)
});
