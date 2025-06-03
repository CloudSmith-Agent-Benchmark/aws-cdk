#!/bin/bash
set -e

# Check if act is installed
if ! command -v act &> /dev/null; then
    echo "Error: 'act' is not installed or not in PATH."
    echo "Please install it:"
    echo "  macOS: brew install act"
    echo "  Linux: curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash"
    echo "  Windows: choco install act-cli or scoop install act"
    echo "More information: https://github.com/nektos/act"
    exit 1
fi

# Validate the codecov-collect.yml workflow
echo "Validating codecov-collect.yml workflow..."
cd "$(git rev-parse --show-toplevel)"
act -n -w .github/workflows/codecov-collect.yml

echo ""
echo "To run the workflow locally:"
echo "  act -w .github/workflows/codecov-collect.yml"
