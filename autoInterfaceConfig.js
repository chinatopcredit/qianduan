  var interfaceConfig = [
    {//本地环境
      host:'',
      protocol:'http',
      //domain:(function(){return location.host})(),
      domain: 'localhost:8080',
      path:'',
      preventAlert:false,
      isDefault:false
    },

    {//生产
      host:'www.ctcfin.com',
      domain: 'www.ctcfin.com',
      path: 'creditLoan/',
      protocol:'http',
      preventAlert:false,
      isDefault:false
    }
  ];
  
  /**
{
0:local本地环境
1:SIT环境
2:UAT环境
3:预生产环境
4:生产环境
}
根据当前的url决定调用的接口环境 或者返回默认的接口环境
环境配置在文件:kaiFrame/src/kai/scripts/app/pc/config/interface.js*/
define([
'util/c.util.common'
],function(
  cUtilCommon
){
  "use strict";
  var util = {};

  util.getEnvConfig = function(interfaceConfigCollection) {
    var host = location.host;/*根据当前的url决定调用的接口环境 或者返回默认的接口环境*/
    var envConfig = _.findWhere(interfaceConfigCollection,{
      host:host
    });
    return envConfig;
  };

  util.getBaseUrl = function(interfaceConfigCollection) {/*设置model的调用信息；根据当前的环境返回调用的接口信息*/
    var bdomain, bpath,protocol;
    var env = util.getEnvConfig(interfaceConfigCollection);
    if(_.isObject(env)){
      if(env.preventAlert){
        cUtilCommon.preventAlert();
      }
    }else{
      var defaultEnv = _.findWhere(interfaceConfigCollection,{
        isDefault:true
      });
      if(!defaultEnv){
        return interfaceConfigCollection[0];
      }
      env = defaultEnv;
    }
    return env;
  };

  return util;
});
  
  
