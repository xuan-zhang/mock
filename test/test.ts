import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { date } from "../mod.ts";

const { test } = Deno;

test("date.dateRange", () => {
  for (let i = 0; i < 10; i++) {
    assertEquals(date.dateRange() > "2000-01-01", true);
  }
  for (let i = 0; i < 10; i++) {
    const time = date.dateRange('1987', '2003')
    assertEquals(time > "1987-01-01" && time < '2003-01-01', true);
  }
});
