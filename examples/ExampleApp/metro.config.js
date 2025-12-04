const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Add support for resolving the parent src directory
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
  ],
  extraNodeModules: {
    'rn-smooth-ui': path.resolve(monorepoRoot, 'src'),
  },
};

// Add watchFolders to include the src directory for hot reloading
config.watchFolders = [
  projectRoot,
  path.resolve(monorepoRoot, 'src'),
];

module.exports = config;

