import Helper from './helper.ts'
import DICT from './addressDict.ts'
import Basic from './basic.ts'
const REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北']

export default {
    // 随机生成一个大区。
    region() {
        return Helper.pick(REGION)
    },
    // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
    province() {
        return Helper.pick(DICT).name
    },
    // 随机生成一个（中国）市。
    city(prefix?: boolean) {
        const province = Helper.pick(DICT)
        const city = Helper.pick(province.children)
        return prefix ? [province.name, city.name].join(' ') : city.name
    },
    // 随机生成一个（中国）县。
    county(prefix?: boolean) {
        const province = Helper.pick(DICT)
        const city = Helper.pick(province.children)
        const county = Helper.pick(city.children) || {
            name: '-'
        }
        return prefix ? [province.name, city.name, county.name].join(' ') : county.name
    },
    // 随机生成一个邮政编码（六位数字）。
    zip(len: number = 6) {
        let zip = ''
        for (let i = 0; i < len; i++) zip += Basic.natural(0, 9)
        return zip
    },
    dict(province?: string, city?: string) {
      if(province && !city) {
        const res = DICT.find(item => item.name.includes(province))
        return res ? [res] : []
      } else if (province && city) {
        const pro = DICT.find(item => item.name.includes(province))
        if (pro && pro.children) {
         const res = pro.children.find(item => item.name.includes(city))
         return res ? [res] : []
        } else {
          return []
        }
      } else if(!province && city) {
        let res;
        DICT.find(item => {
          if (item.children) {
           const pres = item.children.find(c => c.name.includes(city))
           if(pres) {
             res = pres
             return true
           }
          }
        })
        return res ? [res] : []
      } else {
        return DICT
      }
    }
}
