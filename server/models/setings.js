const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 声明一个数据集 对象
const setingSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  terraceList: {
    type: Array,
    default: ['facebook']
  },
  AngleList: {
    type: Array,
    default: ['skincare']
  },
  countryList: {
    type: Array,
    default: ['AE-阿联酋(UNITED EMIRATES)', 'AF-阿富汗(AFGHANISTAN)', 'AL-阿尔巴尼亚(ALBANIA)', 'AM-亚美尼亚(ARMENIA)', 'AO-安哥拉(ANGOLA)', 'AR-阿根廷(ARGENTINA)', 'AT-奥地利(AUSTRIA)', 'AU-澳大利亚(AUSTRALIA)', 'AZ-阿塞拜疆(AZERBAIJAN(REPUBLIC))', 'BD-孟加拉(BANGLADESH)', 'BE-比利时(BELGIUM)', 'BF-布基纳法索(BURKINA FASO)', 'BG-保加利亚(BULGARIA)', 'BH-巴林(BAHREIN)', 'BI-布隆迪(BURUNDI)', 'BJ-贝宁(BENIN)', 'BL-巴勒斯坦()', 'BN-文莱(BRUNEI DARUSSALAM)', 'BO-玻利维亚(BOLIVIA)', 'BR-巴西(BRAZIL)', 'BW-博茨瓦纳(BOTSWANA)', 'BY-白俄罗斯(BYELORUSSIA)', 'CA-加拿大(CANADA)', 'CF-中非(CENTRAL AFRICA)', 'CG-刚果(CONGO)', 'CH-瑞士(SWITZERLAND)', 'CL-智利(CHILE)', 'CM-喀麦隆(CAMEROON)', 'CN-中国(CHINA)', 'CO-哥伦比亚(COLOMBIA)', 'CR-哥斯达黎加(COSTA RICA)', 'CS-捷克(CZECH REPUBIC)', 'CU-古巴(CUBA)', 'CY-塞浦路斯(CYPRUS)', 'DE-德 国(GERMANY)', 'DK-丹麦(DENMARK)', 'DO-多米尼加共和国(DOMINICAN REPUBLIC)', 'DZ-阿尔及利亚(ALGERIA)', 'EC-厄瓜多尔(ECUADOR)', 'EE-爱沙尼亚(ESTONIA)', 'EG-埃及(EGYPT)', 'ES-西班牙(SPAIN)', 'ET-埃塞俄比亚(ETHIOPIA)', 'FI-芬兰(FINLAND)', 'FJ-斐济(FIJI)', 'FR-法国(FRANCE)', 'GA-加蓬(GABON)', 'GB-英国(UNITED KINGDOM)', 'GD-格林纳达(GRENADA)', 'GE-格鲁吉亚(GEORGIA)', 'GH-加纳(GHANA)', 'GN-几内亚(GUINEA)', 'GR-希腊(GREECE)', 'GT-危地马拉(GUATEMALA)', 'HK-香港特别行政区(HONG KONG)', 'HN-洪都拉斯(HONDURAS)', 'HU-匈牙利(HUNGARY)', 'ID-印度尼西亚(INDONESIA)', 'IE-爱尔兰(IRELAND)', 'IL-以色列(ISRAEL)', 'IN-印度(INDIA)', 'IQ-伊拉克(IRAQ)', 'IR-伊朗(IRAN)', 'IS-冰岛(ICELAND)', 'IT-意大利(ITALY)', 'JM-牙买加(JAMAICA)', 'JO-约旦(JORDAN)', 'JP-日本(JAPAN)', 'KG-吉尔吉斯坦(KYRGYZSTAN)', 'KH-柬埔寨(KAMPUCHEA(CAMBODIA))', 'KP-北朝鲜(KOREA,DEM.PEOPLE’S)', 'KR-韩国(REPUBLIC OF KOREA)', 'KT-科特迪瓦共和国(COTE O’IVOIRE)', 'KW-科威特(KUWATI)', 'KZ-哈萨克(KAZAKHSTAN)', 'LA-老挝(LAOS)', 'LB-黎巴嫩(LEBANON)', 'LC-圣卢西亚(SAINT LUEIA)', 'LI-列支敦士登(LIECHTENSTEIN)', 'LK-斯里兰卡(SRI LANKA)', 'LR-利比里亚(LIBERIA)', 'LT-立陶宛(LITHUANIA)', 'LU-卢森堡(LUXEMBOURG)', 'LV-拉脱维亚(LATVIA)', 'LY-利比亚(LIBYAN)', 'MA-摩洛哥(MOROCCO)', 'MC-摩纳哥(MONACO)', 'MD-摩尔多瓦(MOLDOVA,REPUBLIC OF)', 'MG-马达加斯加(MADAGASCAR)', 'ML-马里(MALI)', 'MM-缅甸(BURMA(MYANMAR))', 'MN-蒙古(MONGOLIA)', 'MO-澳门地区(MACAU)', 'MT-马耳他(MALTA)', 'MU-毛里求斯(MAURITIUS)', 'MW-马拉维(MALAWI)', 'MX-墨西哥(MEXICO)', 'MY-马来西亚(MALAYSIA)', 'MZ-莫桑比克(MOZAMBIQUE)', 'NA-纳米比亚(NAMIBIA)', 'NE-尼日尔(NIGER)', 'NG-尼日利亚(NIGERIA)', 'NI-尼加拉瓜(NICARAGUA)', 'NL-荷兰(NETHERLANDS)', 'NO-挪威(NORWAY)', 'NP-尼泊尔(NEPAL)', 'NZ-新西兰(NEW ZEALAND)', 'OM-阿曼(OMAN)', 'PA-巴拿马(PANAMA)', 'PE-秘鲁(PERU)', 'PG-巴布亚新几内亚(PAPUA NEW GUINEA)', 'PH-菲律宾(PHILIPPINES)', 'PK-巴基斯坦(PAKISTAN)', 'PL-波兰(POLAND)', 'PT-葡萄牙(PORTUGAL)', 'PY-巴拉圭(PARAGUAY)', 'QA-卡塔尔(QATAR)', 'RO-罗马尼亚(ROMANIA)', 'RU-俄罗斯(RUSSIAN FEDERATION)', 'SA-沙特阿拉伯(SAUDI ARABIA)', 'SC-塞舌尔(SEYCHELLES)', 'SD-苏丹(SUDAN)', 'SE-瑞典(SWEDEN)', 'SG-新加坡(SINGAPORE)', 'SI-斯洛文尼亚(SLOVENIA)', 'SK-斯洛伐克(SLOVAKIA)', 'SM-圣马力诺(SAN MARINO)', 'SN-塞内加尔(SENEGAL)', 'SO-索马里(SOMALIA)', 'SY-叙利亚(SYRIA)', 'SZ-斯威士兰(SWAZILAND)', 'TD-乍得(CHAD)', 'TG-多哥(TOGO)', 'TH-泰国(THAILAND)', 'TJ-塔吉克斯坦(TAJIKISTAN)', 'TM-土库曼(TURKMENISTAN)', 'TN-突尼斯(TUNISIA)', 'TR-土耳其(TURKEY)', 'TW-台湾省(TAIWAN)', 'TZ-坦桑尼亚(TANZANIA)', 'UA-乌克兰(UKRAINE)', 'UG-乌干达(UGANDA)', 'US-美国(UNITED STATES)', 'UY-乌拉圭(URUGUAY)', 'UZ-乌兹别克(UZBEKISTAN)', 'VC-圣文森特岛(SAINT VINCENT)', 'VE-委内瑞拉(VENEZUELA)', 'VN-越南(VIET NAM)', 'YE-也门(YEMEN)', 'YU-南斯拉夫联盟(YUGOSLAVIA)', 'ZA-南非(SOUTH AFRICA)', 'ZM-赞比亚(ZAMBIA)', 'ZR-扎伊尔(ZAIRE)', 'ZW-津巴布韦(ZIMBABWE)']
  },
  type: {
    type: String,
    default: 'admin'
  }
})
// 将数据模型暴露出去
module.exports = mongoose.model('setings', setingSchema)