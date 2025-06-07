#!/usr/bin/env node

/**
 * This script helps format PR titles according to the repository's conventions.
 * 
 * Usage:
 *   node format-pr-title.js "Your PR title"
 * 
 * Example:
 *   node format-pr-title.js "New: Generate multiple compile / type error for test cases"
 */

const validTypes = ["feat", "fix", "build", "chore", "ci", "docs", "style", "refactor", "perf", "test", "revert"];

function formatPrTitle(title) {
  // Check if the title already follows the convention
  const conventionalFormat = new RegExp(`^(${validTypes.join('|')})(\\([\\w_-]+\\))?: .+`);
  if (conventionalFormat.test(title)) {
    console.log('✅ PR title already follows the conventional format.');
    
    // Check capitalization
    const colonIndex = title.indexOf(':');
    if (colonIndex !== -1) {
      const firstLetterAfterColon = title.charAt(colonIndex + 2);
      if (firstLetterAfterColon !== firstLetterAfterColon.toLowerCase()) {
        const correctedTitle = title.substring(0, colonIndex + 2) + 
                              firstLetterAfterColon.toLowerCase() + 
                              title.substring(colonIndex + 3);
        console.log('⚠️ First word after colon should be lowercase.');
        console.log(`Suggested title: "${correctedTitle}"`);
        return correctedTitle;
      }
    }
    
    return title;
  }

  // Try to extract type from non-conventional format
  let type = 'feat'; // Default type
  let scope = '';
  let description = title;

  // Common mappings for non-conventional prefixes
  const prefixMappings = {
    'new': 'feat',
    'feature': 'feat',
    'add': 'feat',
    'bug': 'fix',
    'bugfix': 'fix',
    'documentation': 'docs',
    'doc': 'docs',
    'enhancement': 'feat',
    'improve': 'perf',
    'performance': 'perf',
    'testing': 'test',
    'tests': 'test',
    'cleanup': 'chore',
    'refactoring': 'refactor'
  };

  // Check for prefix patterns like "Type:" or "Type -"
  const prefixMatch = title.match(/^([A-Za-z]+)[:|-]\s*(.*)/);
  if (prefixMatch) {
    const prefix = prefixMatch[1].toLowerCase();
    description = prefixMatch[2];
    
    if (validTypes.includes(prefix)) {
      type = prefix;
    } else if (prefixMappings[prefix]) {
      type = prefixMappings[prefix];
    }
  }

  // Ensure description starts with lowercase
  if (description && description.length > 0) {
    description = description.charAt(0).toLowerCase() + description.slice(1);
  }

  const formattedTitle = `${type}${scope ? `(${scope})` : ''}: ${description}`;
  
  console.log(`Original title: "${title}"`);
  console.log(`Formatted title: "${formattedTitle}"`);
  console.log('\nNote: You may want to add an appropriate scope in parentheses after the type.');
  console.log('Example: feat(core): your description');
  
  return formattedTitle;
}

// Process command line arguments
if (process.argv.length > 2) {
  const inputTitle = process.argv.slice(2).join(' ');
  formatPrTitle(inputTitle);
} else {
  console.log('Please provide a PR title to format.');
  console.log('Usage: node format-pr-title.js "Your PR title"');
}

module.exports = { formatPrTitle };