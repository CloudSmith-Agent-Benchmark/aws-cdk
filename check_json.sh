#!/bin/bash

# Script to check JSON syntax errors in all files in a directory
TARGET_DIR="packages/aws-cdk-lib/aws-eks/lib/addons"
ERROR_COUNT=0

echo "Checking JSON files for syntax errors..."
for file in $TARGET_DIR/*.json; do
  echo "Checking $file"
  if ! jq . "$file" > /dev/null 2>&1; then
    echo "Error in $file:"
    jq . "$file" 2>&1 | head -3
    ((ERROR_COUNT++))
  fi
done

echo "Found errors in $ERROR_COUNT files"

# Exit with error code if errors were found
if [ $ERROR_COUNT -gt 0 ]; then
  echo "JSON validation failed with $ERROR_COUNT errors"
  exit 1
else
  echo "All JSON files are valid"
  exit 0
fi