#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '../docs');

/**
 * 从菜单项生成 markdown 链接
 */
function generateLinkMD(item, indent = '') {
  if (item.items && item.items.length > 0) {
    // 这是一个分组
    let md = `${indent}- **${item.text}**\n`;
    item.items.forEach(subItem => {
      md += generateLinkMD(subItem, indent + '  ');
    });
    return md;
  } else {
    // 这是一个单独的项目
    return `${indent}- [${item.text}](${item.link})\n`;
  }
}

/**
 * 为单个分类生成内容
 */
function generateCategoryContent(categoryName) {
  const categoryPath = path.join(docsPath, categoryName);
  const menuPath = path.join(categoryPath, '.menu.json');

  if (!fs.existsSync(menuPath)) {
    return '';
  }

  try {
    const menuContent = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

    if (!menuContent.items || menuContent.items.length === 0) {
      return '';
    }

    let md = `## ${categoryName}\n\n`;
    menuContent.items.forEach(item => {
      md += generateLinkMD(item);
    });
    md += '\n';
    return md;
  } catch (error) {
    console.error(`❌ Error reading menu for ${categoryName}:`, error.message);
    return '';
  }
}

/**
 * 主函数：生成 content.md
 */
function main() {
  console.log('🚀 Generating content.md...\n');

  try {
    const rootMenuPath = path.join(docsPath, '.menu.json');
    const rootMenu = JSON.parse(fs.readFileSync(rootMenuPath, 'utf-8'));

    const categories = rootMenu.categories || [];

    let contentMD = `# 博客导航汇总

[[toc]]

`;

    // 为每个分类生成内容
    let totalItems = 0;
    categories.forEach(category => {
      const categoryContent = generateCategoryContent(category);
      if (categoryContent) {
        contentMD += categoryContent;
        // 统计该分类的项目数
        const match = categoryContent.match(/\n- /g);
        if (match) {
          totalItems += match.length;
        }
      }
    });

    // 写入文件
    const contentPath = path.join(docsPath, 'content.md');
    fs.writeFileSync(contentPath, contentMD, 'utf-8');

    console.log(`✅ Generated: ${contentPath}\n`);
    console.log(`📊 Summary:`);
    console.log(`   - Total categories: ${categories.length}`);
    console.log(`   - Total menu items: ~${totalItems}\n`);
    console.log('✨ Done!');
    console.log('💡 Next steps:');
    console.log('   1. Preview the file');
    console.log('   2. Run: npm run dev');

  } catch (error) {
    console.error(`❌ Error:`, error.message);
    process.exit(1);
  }
}

main();
