# Validating GitHub Workflows Locally

This project uses GitHub Actions workflows for continuous integration. To validate these workflows locally before pushing changes, you can use the [act](https://github.com/nektos/act) tool.

## Installing Act

### macOS
```bash
brew install act
```

### Linux
```bash
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

### Windows
```bash
choco install act-cli
```
Or with scoop:
```bash
scoop install act
```

## Validating Workflows

After installing `act`, you can validate a workflow by running:

```bash
# Run a specific workflow
act -w .github/workflows/codecov-collect.yml

# Run a specific job
act -j collect -w .github/workflows/codecov-collect.yml

# Run with specific event
act push -w .github/workflows/codecov-collect.yml
```

## Troubleshooting

### Docker Requirements
`act` requires Docker to be installed and running. Make sure Docker is available on your system.

### Secrets and Environments
For workflows that require secrets or specific environment variables, create a `.secrets` file:

```
GITHUB_TOKEN=your_personal_access_token
```

Then run act with the secrets file:

```bash
act -s GITHUB_TOKEN=your_personal_access_token
```

### Memory Issues
If Docker runs out of memory, increase the memory allocation in Docker settings.

## Additional Resources

- [Act GitHub repository](https://github.com/nektos/act)
- [Act documentation](https://github.com/nektos/act#readme)
