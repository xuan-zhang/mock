import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { date, misc } from "../mod.ts";

const { test } = Deno;

test("date.dateRange", () => {
  for (let i = 0; i < 10; i++) {
    assertEquals(date.dateRange() > "2000-01-01", true);
  }
  for (let i = 0; i < 10; i++) {
    const time = date.dateRange("1987", "2003");
    assertEquals(time > "1987-01-01" && time < "2003-01-01", true);
  }
});

test("pickOne", () => {
  for (let i = 0; i < 5; i++) {
    const a = misc.pickOne("a", "b", "c");
    assertEquals(a == "a" || a == "b" || a == "c", true);
  }

  for (let i = 0; i < 5; i++) {
    const a = misc.pickOne(["a", "b", "c"]);
    assertEquals(a == "a" || a == "b" || a == "c", true);
  }
  for (let i = 0; i < 100; i++) {
    const a = misc.pickOne(1, 3);
    assertEquals(a === 1 || a === 3, true);
  }
});

test("PhoneNumber", () => {
  const realReg =
    /^[1](([38][0-9])|([4][4-9])|([59][0-3,5-9])|([6][2,5,6,7])|([7][0-8]))[0-9]{8}$/;
  const xReg =
    /^[1](([38][0-9])|([4][4-9])|([59][0-3,5-9])|([6][2,5,6,7])|([7][0-8]))\*\*\*\*\*[0-9]{4}$/;
  for (let i = 0; i < 50; i++) {
    const phone = misc.phone(true);
    const xPhone = misc.phone();
    assertEquals(realReg.test(phone), true);
    assertEquals(xReg.test(xPhone), true);
  }
});
