module.exports = async () => {
    process.env.TZ = 'Asia/Tokyo'; // 固定したい任意のタイムゾーンを指定
    process.env.NODE_ENV = "test";
  };