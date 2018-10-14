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
  console.log("mock...........")
  let total = 100000;
  let data = [];
  let pageNumber = options.pageNumber;
  let pageSize = options.pageSize;
  let start = (pageNumber - 1) * pageSize;
  for (let i = start + 1; i <= start + pageSize; i++) {
    let amount = Math.floor(Math.random() * 1000);
    let price = Math.floor(Math.random() * 1000);
    data.push({
      inv: "Inv No " + i,
      name: Random.cname(),// Random.cname() 随机生成一个常见的中文姓名
      amount: amount,
      price: price,
      cost: amount * price,
      note: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
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
Mock.mock('/org/company', 'get', demoData);
