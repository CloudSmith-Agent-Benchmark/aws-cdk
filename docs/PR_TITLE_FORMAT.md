# Pull Request Title Format Guidelines

This document provides guidelines for creating properly formatted PR titles for the AWS CDK repository.

## Required Format

PR titles must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>
```

Where:
- **type**: Must be one of:
  - `feat` - A new feature
  - `fix` - A bug fix
  - `build` - Changes that affect the build system
  - `chore` - Other changes that don't modify src or test files
  - `ci` - Changes to CI configuration files and scripts
  - `docs` - Documentation only changes
  - `style` - Changes that do not affect the meaning of the code (white-space, formatting, etc)
  - `refactor` - A code change that neither fixes a bug nor adds a feature
  - `perf` - A code change that improves performance
  - `test` - Adding missing tests or correcting existing tests
  - `revert` - Reverts a previous commit

- **scope** (optional): The scope of the change (e.g., component name, module name)
  - Should be lowercase
  - For AWS services, omit the `aws-` prefix (e.g., use `s3` instead of `aws-s3`)
  - Exception: `aws-cdk-lib` is allowed with the prefix

- **description**: A brief description of the change
  - Must start with lowercase
  - If starting with a CDK construct name, use backticks (e.g., `` `App` ``)

## Examples

✅ **Correct formats**:
- `feat(s3): add new bucket property`
- `fix(lambda): resolve function timeout issue`
- `docs: update installation instructions`
- `test(core): add missing test cases`
- `feat(cognito): add support for `UserPool` custom attributes`

❌ **Incorrect formats**:
- `New: Add feature` - Wrong type prefix
- `feat(S3): add feature` - Scope should be lowercase
- `feat(aws-s3): add feature` - Should omit 'aws-' prefix
- `feat: Add new feature` - Description should start with lowercase

## Breaking Changes

For breaking changes, include `BREAKING CHANGE:` in the commit body (not the title), followed by a description of the breaking change.

## PR Linter

The repository uses an automated PR linter that enforces these conventions. PRs that don't follow these guidelines will be automatically flagged for correction.