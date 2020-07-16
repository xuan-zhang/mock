import Basic from "./basic.ts";
import Helper from "./helper.ts";
import Date from "./date.ts";
import DICT from "./addressDict.ts";

export default {
  // Dice
  d4() {
    return Basic.natural(1, 4);
  },
  d6() {
    return Basic.natural(1, 6);
  },
  d8() {
    return Basic.natural(1, 8);
  },
  d12() {
    return Basic.natural(1, 12);
  },
  d20() {
    return Basic.natural(1, 20);
  },
  d100() {
    return Basic.natural(1, 100);
  },
  /*
	    随机生成一个 GUID。

	    http://www.broofa.com/2008/09/javascript-uuid-function/
	    [UUID 规范](http://www.ietf.org/rfc/rfc4122.txt)
	        UUIDs (Universally Unique IDentifier)
	        GUIDs (Globally Unique IDentifier)
	        The formal definition of the UUID string representation is provided by the following ABNF [7]:
	            UUID                   = time-low "-" time-mid "-"
	                                   time-high-and-version "-"
	                                   clock-seq-and-reserved
	                                   clock-seq-low "-" node
	            time-low               = 4hexOctet
	            time-mid               = 2hexOctet
	            time-high-and-version  = 2hexOctet
	            clock-seq-and-reserved = hexOctet
	            clock-seq-low          = hexOctet
	            node                   = 6hexOctet
	            hexOctet               = hexDigit hexDigit
	            hexDigit =
	                "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
	                "a" / "b" / "c" / "d" / "e" / "f" /
	                "A" / "B" / "C" / "D" / "E" / "F"

	    https://github.com/victorquinn/chancejs/blob/develop/chance.js#L1349
	*/
  guid() {
    const pool = "abcdefABCDEF1234567890";
    return Basic.string(pool, 8) + "-" +
      Basic.string(pool, 4) + "-" +
      Basic.string(pool, 4) + "-" +
      Basic.string(pool, 4) + "-" +
      Basic.string(pool, 12);
  },
  uuid: function () {
    return this.guid();
  },
  /*
	    随机生成一个 18 位身份证。

	    [身份证](http://baike.baidu.com/view/1697.htm#4)
	        地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
	    [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
	*/
  identityNumber() {
    let id,
      sum = 0,
      rank = [
        "7",
        "9",
        "10",
        "5",
        "8",
        "4",
        "2",
        "1",
        "6",
        "3",
        "7",
        "9",
        "10",
        "5",
        "8",
        "4",
        "2",
      ],
      last = [
        "1",
        "0",
        "X",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
      ];

    id = Helper.pick(DICT).id +
      Date.date("yyyyMMdd") +
      Basic.string("number", 3);

    for (let i = 0; i < id.length; i++) {
      sum += (id[i] as any) * (rank[i] as any);
    }
    id += last[sum % 11];

    return id;
  },

  /*
	    生成一个全局的自增整数。
	    类似自增主键（auto increment primary key）。
	*/
  increment: function () {
    let key = 0;
    return function (step?: number) {
      return key += (Number(step) || 1); // step?
    };
  }(),
  inc(step?: number) {
    return this.increment(step);
  },
  phone(real?: boolean) {
    // 13[0-9], 14[5,6,7,8,9], 15[0-3, 5-9], 16[2,5,6,7], 17[0-8], 18[0-9], 19[0-3, 5-9]
    let s = Helper.pick(["13", "14", "15", "16", "17", "18", "19"]);
    switch (s) {
      case '13':
      case '18':
        s += Basic.natural(0, 9);
        break;
      case '14':
        s += Helper.pick([4, 5, 6, 7, 8, 9]);
        break;
      case '15':
      case '19':
        s += Helper.pick([0, 1, 2, 3, 5, 6, 7, 8, 9]);
        break;
      case '16':
        s += Helper.pick(2, 5, 6, 7);
        break;
      case '17':
        s += Basic.natural(0, 8);
        break;
    }

    return s +=
      (real ? Basic.natural(0, 9999).toString().padStart(4, "0") : "*****") +
      Basic.natural(0, 9999).toString().padStart(4, "0");
  },
  pickOne: Helper.pick,
};
