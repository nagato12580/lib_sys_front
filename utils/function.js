/**
 * 定义了一些常用函数
 */


/**
 * 作用：将路径参数转换为对象
 * 接收参数为：strParas：'pa=1?pb=2'
 * 返回对象:{pa:"1",ps="2"}
 */
function getUrlParasObj(strParas){
  var data=strParas.split('&')
      var paras={};
      var len = data.length;
      for (var a = 0; a < len; a++) {
          var nv = data[a].split('=');
          paras[nv[0]] = unescape(nv[1]);
      }
  return paras
}
/**
 * 作用：下载文件，仅支持文档
 * 支持文档：doc,docx,xls,xlsx,ppt,pptx,pdf
 * 接收参数为：文件url
 */
function downloadFile(url) {
    wx.showLoading({
      title: '下载中',
    })
    //发起下载请求
    wx.downloadFile({
      url: url, 
      success (res) {
        console.log(res)
        if (res.statusCode === 200) {
          // 获取到临时文件路径
          let tempFilePath = res.tempFilePath;
          // 保存文件到本地
          wx.getFileSystemManager().saveFile({
            tempFilePath: tempFilePath,
            success: function (res_) {
              // 文件保存成功
              console.log(res, '下载成功');
              wx.hideLoading();
              wx.openDocument({
                filePath: res_.savedFilePath,
                showMenu: true,
              })
            },
            fail: function (err) {
              console.log(err);
            }
          });
        }
      }
    })
}
function getNextFormattedDate() {
  const currentDate = new Date();
  
  // 获取当前日期的时间戳，并加上一天的毫秒数
  const nextDayTimestamp = currentDate.getTime() + 24 * 60 * 60 * 1000;

  // 创建新的 Date 对象，并设置为下一天
  const nextDay = new Date(nextDayTimestamp);

  // 获取年、月、日
  const year = nextDay.getFullYear();
  const month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
  const day = nextDay.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

module.exports = {
  getUrlParasObj: getUrlParasObj,
  downloadFile:downloadFile,
  getNextFormattedDate:getNextFormattedDate,
}