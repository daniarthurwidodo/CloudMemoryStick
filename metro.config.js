const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .js extensions to resolve
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const defaultResolve = context.resolveRequest;
  
  if (moduleName.startsWith('@tanstack/')) {
    // Handle TanStack Query .js extension issue
    if (moduleName.endsWith('.js')) {
      const resolved = defaultResolve(
        context,
        moduleName.replace(/\.js$/, ''),
        platform
      );
      return resolved;
    }
  }
  
  return defaultResolve(context, moduleName, platform);
};

module.exports = config;
