const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function () {
  let articles = [];
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}

const demoData = function (options) {
  console.log("mock...........",JSON.parse(options.body))
  let param = JSON.parse(options.body);
  let total = 100000;
  let data = [];
  let pageNumber = param.pageNumber;
  let pageSize = param.pageSize;
  let start = (pageNumber - 1) * pageSize;
  for (let i = start + 1; i <= start + pageSize; i++) {
    data.push({
      id:  Random.id(),
      code:Random.integer(1000,9999),
      name: Random.ctitle(4)+"有限公司",// Random.cname() 随机生成一个常见的中文姓名
      shortName: Random.ctitle(4),
      address: Random.province()+Random.city()+Random.county(),
      postcode: Random.zip(),
      webSite: Random.url(),
      telPhone:Random.integer(10000,900000),
      email:Random.email("263.com"),
      registeredCapital:Random.float(60, 100, 0, 2) +"万元",
      createTime: Random.date(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    });
  }
  return {
    total: total,
    pageNumber: pageNumber,
    pageSize: pageSize,
    rows: data
  };
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/org/company', 'post', demoData);
