console.log("RegExp");

function checkUserName(userName) {
  /* 
   * 用户名
   * 4-16位
   * 字母、数字、下划线或减号
   */
  const regexp = /^[\w-]{4,16}$/;
  return regexp.test(userName);
}

function checkHexadecimalColorCode(hexadecimalColorCode) {
  /* 
   * 十六进制颜色码
   * #开头 字符3或6位
   * 十六进制字符
   */
  const regexp = /^#([\da-zA-Z]{3}|[\da-zA-Z]{6})$/;
  return regexp.test(hexadecimalColorCode);
}

function checkPassword(password) {
  /* 
   * 密码
   * 6位及以上
   * 至少1个大写字母，1个小写字母，1个数字，1个特殊字符
   */
  const regexp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?~_])^[0-9a-zA-Z!@#$%^&*?~_]{6,}$/;
  return regexp.test(password);
}

function check24HourClock(time) {
  /* 
   * 24小时制时间
   * 2位:2位
   * 第1位数字为[0-2]
     第1位数字为[2]时，第2位数字可以为[0-3]；第1位数字为[0-1]时，第2位数字可以为[0-9]
     第3位数字为[0-5]，第4位数字为[0-9]
   */
  const regexp = /^([0-1][0-9]|[2][0-3]):[0-5][0-9]$/;
  return regexp.test(time);
}

function checkDate(date) {
  /* 
   * 日期
   * yyyy-mm-dd
   * yyyy 0001-9999
     mm 第1位数字为[0-1]
        第1位数字为[0]时，第2位数字为[1-9]
        第1位数字为[1]时，第2位数字为[0-2]
     dd 月份为[0][13578]或[1][02]时，最大日期为31 ([0][13578]|[1][02])-([0][1-9]|[1-2][0-9]|[3][0-1])
        月份为[0][469]或[1][1]时，最大日期为30 ([0][469]|[1][1])-([0][1-9]|[1-2][0-9]|[3][0])
        月份为[0][2]时，年份为闰年，最大日期为29；否则最大日期为28 闰年特例([0][2])-([2][9]) 闰年和非闰年通例([0][2])-([0][1-9]|[1-2][0-8])
   */
  /* 闰年特例 ([0][2])-([2][9])*/
  /* 闰年和非闰年通例mm-dd(([0][13578]|[1][02])-([0][1-9]|[1-2][0-9]|[3][0-1])|([0][469]|[1][1])-([0][1-9]|[1-2][0-9]|[3][0])|([0][2])-([0][1-9]|[1-2][0-8])) */
  /* 闰年特例yyyy([0-9]{2}([0][48]|[2468][048]|[13579][26])|([0][48]|[2468][048]|[3579][26])[0][0]) */
  const regexp = /^(((?=.{0,3}[1-9])[0-9]{4})-((0[13578]|1[02])-(0[1-9]|[1-2][0-9]|3[0-1])|(0[469]|11)-(0[1-9]|[1-2][0-9]|30)|(02)-(0[1-9]|[1-2][0-8]))|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[3579][26])00)-(02)-(29))$/;
  return regexp.test(date);
}

function checkWindowsFilePath(path) {
  /* 
   * Windows系统文件路径
   * 盘符:\文件夹\文件夹\文件夹(\)
   */
  const regexp = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
  return regexp.test(path);
}

function checkId(id) {
  /* 
   * id=""
   */
  const regexp = /^id="[^"]*"$/;
  return regexp.test(id);
}

function checkNone(str) {
  /* 
   * 不匹配任何
   */
  const regexp = /.^/;
  return regexp.test(str);
}

function checkCurrency(currency) {
  /* 
   * 货币千位分隔符表示法
   * xxx,xxx,xxx.xx
   */
  const regexp = /^([1-9][0-9]{0,2}|0)(,[0-9]{3})*(.[0-9]{2})?$/;
  return regexp.test(currency);
}

function formatCurrency(currency) {
  /* 格式化货币表示 */
  if (typeof currency !== 'number') {
    throw new TypeError(currency + ' is not a number');
  }
  /* const regexp = /(?!^)(?=([0-9]{3})+$)/g; */
  const regexp = /\B(?=([0-9]{3})+\b)/g;
  const result = currency.toFixed(2).replace(regexp, ',');
  return result;
}

function checkIsContainCn(str) {
  /* 
   * 含有中文
   */
  const regexp = /[\u4E00-\u9FA5]/;
  return regexp.test(str);
}

function checkQQNum(QQNum) {
  /* 
   * QQ号
   */
  const regexp = /^[1-9][0-9]{4,10}$/;
  return regexp.test(QQNum);
}

function checkWechatNum(WechatNum) {
  /* 
   * 微信号
   */
  const regexp = /^[a-zA-Z][0-9a-zA-Z_-]{5,19}$/;
  return regexp.test(WechatNum);
}

function checkURL(url) {
  /* 
   * url
   */
  const regexp = /^$/;
  return regexp.test(url);
}

function checkEmail(email) {
  /* 
   * 邮箱
   * 登录名@主机名.域名
   * 登录名（以网易为例）6-18位 数字、字母或下划线 必须以字母开头
   */
  const regexp = /^[A-Za-z][A-Za-z0-9_]+\@主机名\.域名$/;
  return regexp.test(email);
}

function checkPhoneNumber(phoneNumber) {
  /* 
   * 手机号
   */
  const regexp = /^1[34578][0-9]{9}$/;
  return regexp.test(phoneNumber);
}

function checkCnReIdNum(cnReIdNum) {
  /* 
   * 身份证号
   */
  const regexp = /^[1-8][1-7](0[1-9]|[1-4][0-9]|[59]0)(0[1-9]|[1-9][0-9])((?=.{0,3}[1-9])[0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])[0-9]{3}[0-9Xx]$/;
  return regexp.test(cnReIdNum);
}