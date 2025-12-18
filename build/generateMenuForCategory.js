#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '../docs');

/**
 * 递归构建菜单项（支持任意深度）
 * @param {string} dirPath 目录路径
 * @param {string} categoryName 分类名称
 * @param {string} relativePath 相对路径（用于生成链接）
 */
function buildMenuItems(dirPath, categoryName, relativePath = '') {
  const items = [];

  try {
    const files = fs.readdirSync(dirPath);

    // 分离 markdown 文件和子目录
    const mdFiles = [];
    const subDirs = [];

    files.forEach(file => {
      if (file.startsWith('.')) return; // 忽略隐藏文件

      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        subDirs.push(file);
      } else if (file.endsWith('.md') && !['index.md', 'README.md'].includes(file)) {
        mdFiles.push(file);
      }
    });

    // 添加 markdown 文件
    mdFiles.sort().forEach(file => {
      const name = file.replace('.md', '');
      const linkPath = relativePath ? `${relativePath}/${name}` : `/${categoryName}/${name}`;
      items.push({
        text: name,
        link: linkPath
      });
    });

    // 递归添加子目录
    subDirs.sort().forEach(subDir => {
      const subPath = path.join(dirPath, subDir);
      const newRelativePath = relativePath ? `${relativePath}/${subDir}` : `/${categoryName}/${subDir}`;
      const subItems = buildMenuItems(subPath, categoryName, newRelativePath);

      if (subItems.length > 0) {
        items.push({
          text: subDir,
          collapsed: true,
          items: subItems
        });
      }
    });
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }

  return items;
}

/**
 * 统计菜单项数量
 */
function countMenuItems(items) {
  let count = 0;
  items.forEach(item => {
    count++;
    if (item.items) {
      count += countMenuItems(item.items);
    }
  });
  return count;
}

/**
 * 显示菜单结构
 */
function displayMenuStructure(items, indent = '') {
  items.forEach((item, idx) => {
    if (item.items) {
      console.log(`${indent}${idx + 1}. [Group] ${item.text} (${item.items.length} items)`);
      displayMenuStructure(item.items, indent + '   ');
    } else {
      console.log(`${indent}${idx + 1}. ${item.text}`);
    }
  });
}

/**
 * 生成某个目录的 .menu.json 文件
 * @param {string} categoryName 分类名称
 */
function generateMenuForCategory(categoryName) {
  const categoryPath = path.join(docsPath, categoryName);

  // 检查目录是否存在
  if (!fs.existsSync(categoryPath)) {
    console.error(`❌ Directory not found: ${categoryPath}`);
    process.exit(1);
  }

  const stat = fs.statSync(categoryPath);
  if (!stat.isDirectory()) {
    console.error(`❌ Not a directory: ${categoryPath}`);
    process.exit(1);
  }

  console.log(`🚀 Generating menu for: ${categoryName}\n`);

  try {
    // 递归构建菜单项
    const items = buildMenuItems(categoryPath, categoryName);

    // 生成菜单配置
    const menuConfig = {
      text: categoryName,
      collapsed: true,
      items: items
    };

    const menuPath = path.join(categoryPath, '.menu.json');
    fs.writeFileSync(menuPath, JSON.stringify(menuConfig, null, 2), 'utf-8');

    console.log(`✅ Generated: ${menuPath}\n`);
    console.log(`📊 Summary:`);
    console.log(`   - Total menu items: ${countMenuItems(items)}\n`);

    console.log('📋 Menu structure:');
    displayMenuStructure(items);

    console.log('\n✨ Done!');
    console.log('💡 Next steps:');
    console.log(`   1. Review ${menuPath}`);
    console.log('   2. Edit it if needed (adjust order, text, or collapsed state)');
    console.log('   3. Run: npm run generate:sidebar');
    console.log('   4. Run: npm run dev');
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    process.exit(1);
  }
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Usage: node generateMenuForCategory.js <category-name>');
    console.error('\nExamples:');
    console.error('   node generateMenuForCategory.js Vue');
    console.error('   node generateMenuForCategory.js JavaScript');
    console.error('   node generateMenuForCategory.js FrontEndEngineering');
    process.exit(1);
  }

  const categoryName = args[0];
  generateMenuForCategory(categoryName);
}

main();
