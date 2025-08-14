// lib/config.js

const fs = require('fs');
const path = require('path');

/**
 * 加载并合并默认配置和用户自定义配置
 * 从根目录寻找 'nexora.config.js' 文件
 * @returns {object} 合并后的最终配置对象
 */
function loadConfig() {
  const userProjectRoot = process.cwd();

  /** @type {import('./types').ProRouterConfig} */
  const defaultConfig = {
    enabled: true,
    routersPath: path.join(userProjectRoot, 'routers'),
    outputPath: path.join(userProjectRoot, 'routeMap.js'),
    watchExtensions: 'js,json',
  };

  const userConfigPath = path.join(userProjectRoot, 'nexora.config.js');
  let userConfig = {};

  if (fs.existsSync(userConfigPath)) {
    try {
      userConfig = require(userConfigPath);
      console.log('[Nexora] Loaded user configuration from nexora.config.js');
    } catch (error) {
      console.error('[Nexora] Error loading nexora.config.js:', error);
      process.exit(1);
    }
  }

  return { ...defaultConfig, ...userConfig };
}

module.exports = { loadConfig };