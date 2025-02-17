module.exports = ({ config }) => ({
  ...config,
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "your-org",
          project: "your-project",
          authToken: "your-auth-token"
        }
      }
    ]
  },
  extra: {
    ...config.extra,
    newArchEnabled: true
  }
}); 