export default () => {
  process.env.NODE_ENV = "development";
  process.env.CDN_HOST = "CDN_HOST";

  //  feature flags
  process.env.UNESCAPE = "false";
};