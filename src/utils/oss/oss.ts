const productConfig = {
    accessKeyId: 'accessKeyId',
    accessKeySecret: 'accessKeySecret',
    endpoint: 'endpoint',
    bucket: 'bucket',
    region: 'region',
  };
   
  const localConfig = {
    accessKeyId: 'accessKeyId',
    accessKeySecret: 'accessKeySecret',
    endpoint: 'endpoint',
    bucket: 'bucket',
    region: 'region',
  };
   
  // 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
  const ossConfig = process.env.NODE_ENV ? productConfig : localConfig;
   
  export default ossConfig;