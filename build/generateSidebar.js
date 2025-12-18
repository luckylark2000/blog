#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 配置
const docsPath = path.join(__dirname, '../docs');
const configPath = path.join(__dirname, '../docs/.vitepress/config.mts');
const rootMenuPath = path.join(docsPath, '.menu.json');

/**
 * 读取根菜单配置
 */
function readRootMenuConfig() {
  try {
    const content = fs.readFileSync(rootMenuPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Failed to read ${rootMenuPath}:`, error.message);
    process.exit(1);
  }
}

/**
 * 读取某个分类的菜单配置
 */
function readCategoryMenu(categoryName) {
  const menuPath = path.join(docsPath, categoryName, '.menu.json');

  try {
    const content = fs.readFileSync(menuPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️  Failed to read ${menuPath}:`, error.message);
    return null;
  }
}

/**
 * 生成 sidebar 配置
 */
function generateSidebar(rootConfig) {
  const sidebar = [];

  // 添加根菜单项
  if (rootConfig.rootItems && Array.isArray(rootConfig.rootItems)) {
    sidebar.push(...rootConfig.rootItems);
  }

  // 按定义的顺序添加各分类
  if (rootConfig.categories && Array.isArray(rootConfig.categories)) {
    rootConfig.categories.forEach(categoryName => {
      const categoryMenu = readCategoryMenu(categoryName);
      if (categoryMenu) {
        sidebar.push(categoryMenu);
      } else {
        console.warn(`⚠️  Skipping category: ${categoryName}`);
      }
    });
  }

  return sidebar;
}

/**
 * 将 sidebar 配置写入 config.mts
 */
function updateConfigFile(sidebar) {
  let configContent = fs.readFileSync(configPath, 'utf-8');

  // 生成 sidebar 代码
  const sidebarCode = `    sidebar: ${JSON.stringify(sidebar, null, 6).replace(/"/g, "'")}`;

  // 找到 sidebar 的开始位置
  const sidebarStart = configContent.indexOf('    sidebar: [');
  if (sidebarStart === -1) {
    console.error('❌ Could not find sidebar start in config file');
    process.exit(1);
  }

  // 从 sidebar 开始位置找到对应的结尾
  let bracketCount = 0;
  let sidebarEnd = -1;
  let inString = false;
  let stringChar = '';

  for (let i = sidebarStart + 13; i < configContent.length; i++) {
    const char = configContent[i];

    // 处理字符串
    if ((char === '"' || char === "'" || char === '`') && configContent[i - 1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    // 只有不在字符串中时才计算括号
    if (!inString) {
      if (char === '[') {
        bracketCount++;
      } else if (char === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          sidebarEnd = i + 1;
          break;
        }
      }
    }
  }

  if (sidebarEnd === -1) {
    console.error('❌ Could not find sidebar end in config file');
    process.exit(1);
  }

  // 替换 sidebar 部分
  const newConfigContent =
    configContent.substring(0, sidebarStart) +
    sidebarCode +
    configContent.substring(sidebarEnd);

  fs.writeFileSync(configPath, newConfigContent, 'utf-8');
  console.log('✅ Successfully updated config.mts');
}

/**
 * 主函数
 */
function main() {
  try {
    console.log('🚀 Reading menu configuration...\n');

    const rootConfig = readRootMenuConfig();

    if (!rootConfig.categories || !Array.isArray(rootConfig.categories)) {
      console.error('❌ Invalid root menu config: missing "categories" array');
      process.exit(1);
    }

    console.log(`📋 Found ${rootConfig.categories.length} categories:`);
    rootConfig.categories.forEach((cat, idx) => {
      console.log(`   ${idx + 1}. ${cat}`);
    });

    console.log('\n🔄 Generating sidebar configuration...');
    const sidebar = generateSidebar(rootConfig);

    updateConfigFile(sidebar);

    console.log(`\n✨ Sidebar updated with ${sidebar.length} categories`);
    console.log('💡 Tip: Edit docs/.menu.json to change category order or hide categories');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
