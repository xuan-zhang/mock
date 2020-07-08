import Mock from "./basic.ts";

export default {
  // 把字符串的第一个字母转换为大写。
  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  },
  // 把字符串转换为大写。
  upper(str: string) {
    return str.toUpperCase();
  },
  // 把字符串转换为小写。
  lower(str: string) {
    return str.toLowerCase();
  },
  // 从数组中随机选取一个元素，并返回。
  pick(arr: any, min?: any, max?: any, ...agrs: any[]): any {
    // pick( item1, item2 ... )
    if (!Array.isArray(arr)) {
      arr = [].slice.call(arguments);
      min = 1;
      max = 1;
    } else {
      // pick( [ item1, item2 ... ] )
      if (min === undefined) min = 1;

      // pick( [ item1, item2 ... ], count )
      if (max === undefined) max = min;
    }

    if (min === 1 && max === 1) return arr[Mock.natural(0, arr.length - 1)];

    // pick( [ item1, item2 ... ], min, max )
    return this.shuffle(arr, min, max);
  },
  /*
	    打乱数组中元素的顺序，并返回。
	*/
  shuffle(arr: any[] = [], min?: number, max?: number): any[] {
    let old = arr.slice(0),
      result = [],
      index = 0,
      length = old.length;
    for (let i = 0; i < length; i++) {
      index = Mock.natural(0, old.length - 1);
      result.push(old[index]);
      old.splice(index, 1);
    }
    switch (arguments.length) {
      case 0:
      case 1:
        return result;
      case 2:
        max = min;
        /* falls through */
      case 3:
        min = parseInt(min + "", 10);
        max = parseInt(max + "", 10);
        return result.slice(0, Mock.natural(min, max));
      default:
        return result.slice(0, Mock.natural(min, max));
    }
  },
};
