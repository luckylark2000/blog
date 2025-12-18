#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '../docs');

/**
 * 扫描 docs 目录，找到所有顶级分类
 */
function scanCategories() {
  try {
    const files = fs.readdirSync(docsPath);
    const categories = files
      .filter(f => {
        // 是目录且不是隐藏目录
        const fullPath = path.join(docsPath, f);
        const stat = fs.statSync(fullPath);
        return stat.isDirectory() && !f.startsWith('.');
      })
      .sort();

    return categories;
  } catch (error) {
    console.error('❌ Error scanning categories:', error.message);
    process.exit(1);
  }
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 Generating root menu configuration...\n');

  const categories = scanCategories();

  console.log(`📋 Found ${categories.length} categories:`);
  categories.forEach((cat, idx) => {
    console.log(`   ${idx + 1}. ${cat}`);
  });

  // 创建根菜单配置
  const rootMenuConfig = {
    isRoot: true,
    rootItems: [
      {
        text: "简介",
        collapsed: false,
        items: [
          {
            text: "自我介绍",
            link: "/introduce"
          }
        ]
      }
    ],
    categories: categories
  };

  const outputPath = path.join(docsPath, '.menu.json');
  fs.writeFileSync(outputPath, JSON.stringify(rootMenuConfig, null, 2), 'utf-8');

  console.log(`\n✅ Generated ${outputPath}`);
  console.log('\n💡 你可以：');
  console.log('   1. 编辑 docs/.menu.json 来调整分类顺序');
  console.log('   2. 从 categories 数组中删除分类来隐藏它');
  console.log('   3. 修改 rootItems 来自定义根菜单项');
  console.log('   4. 然后运行 npm run generate:sidebar');
}

main();
