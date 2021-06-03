#!/usr/bin/env -S node --no-warnings
/**
 * プロンプトファイルを結合して .clinerules を生成するスクリプト
 */

const fs = require('fs');
const path = require('path');

const RULES_DIR = path.join(__dirname, 'rules');
const OUTPUT_FILE = path.join(process.cwd(), '.clinerules');

async function main() {
  try {
    // プロンプトファイルを読み込む
    const files = [];
    const entries = fs.readdirSync(RULES_DIR);

    for (const entry of entries) {
      if (
        fs.statSync(path.join(RULES_DIR, entry)).isFile() &&
        entry.endsWith('.md') &&
        !entry.startsWith('_')
      ) {
        files.push(entry);
      }
    }

    // ファイル名でソート
    files.sort();

    // 各ファイルの内容を結合
    const contents = [];
    for (const file of files) {
      const content = fs.readFileSync(`${RULES_DIR}/${file}`, 'utf8');
      contents.push(content);
    }

    // .clinerules に書き出し
    const result = contents.join('\n\n');
    fs.writeFileSync(OUTPUT_FILE, result);
    console.log(`Generated ${OUTPUT_FILE} from ${files.length} prompt files`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
