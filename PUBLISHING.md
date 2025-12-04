# Publishing Guide

## 📦 Publishing to npm

Yes, you can **update your package anytime** after publishing! Each update requires a new version number.

## 🚀 First Time Publishing

### 1. Prerequisites

- Create an npm account at [npmjs.com](https://www.npmjs.com/signup)
- Login via terminal: `npm login`

### 2. Build the Package

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### 3. Check What Will Be Published

```bash
npm pack --dry-run
```

This shows what files will be included in the package.

### 4. Publish

```bash
npm publish
```

For the first publish, you can use:
```bash
npm publish --access public
```

## 🔄 Updating the Package

You can update your package as many times as you want! Here's how:

### Option 1: Manual Version Bump

```bash
# Patch version (1.0.0 -> 1.0.1) - bug fixes
npm version patch
npm publish

# Minor version (1.0.0 -> 1.1.0) - new features
npm version minor
npm publish

# Major version (1.0.0 -> 2.0.0) - breaking changes
npm version major
npm publish
```

### Option 2: Use Convenience Scripts

```bash
# Patch release (bug fixes)
npm run publish:patch

# Minor release (new features)
npm run publish:minor

# Major release (breaking changes)
npm run publish:major
```

### Option 3: Specify Version Manually

Edit `package.json` version field, then:
```bash
npm publish
```

## 📋 Versioning (Semantic Versioning)

Follow [Semantic Versioning](https://semver.org/):

- **PATCH** (1.0.0 → 1.0.1): Bug fixes, small improvements
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes, not backward compatible

## ✅ Pre-Publish Checklist

Before publishing, make sure:

- [ ] Code is tested
- [ ] `npm run build` succeeds
- [ ] `README.md` is up to date
- [ ] Version number is correct
- [ ] All changes are committed to git
- [ ] `.npmignore` excludes unnecessary files

## 🔍 What Gets Published

The following files are included (defined in `package.json` `files` field):
- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Documentation
- `LICENSE` - License file

The following are excluded (via `.npmignore`):
- `src/` - Source files
- `examples/` - Example app
- `node_modules/` - Dependencies
- Development config files

## 🛠️ Development Workflow

1. **Make changes** to components in `src/`
2. **Test locally** using the example app: `npm run example`
3. **Build** the package: `npm run build`
4. **Bump version**: `npm version patch|minor|major`
5. **Publish**: `npm publish`

## 📝 Example Workflow

```bash
# 1. Make your changes to src/components/Button/Button.tsx

# 2. Test in example app
npm run example

# 3. Build
npm run build

# 4. Bump version (patch for bug fix)
npm version patch

# 5. Publish
npm publish

# Done! Users can now update with: npm install rn-smooth-ui@latest
```

## 🔐 Publishing Scoped Packages

If you want to publish as a scoped package (e.g., `@yourname/rn-smooth-ui`):

1. Update `package.json` name: `"name": "@yourname/rn-smooth-ui"`
2. Publish with: `npm publish --access public`

## 🚨 Important Notes

- **You can always update** - npm packages are versioned, so you can publish unlimited updates
- **Version numbers must increase** - You can't republish the same version
- **Test before publishing** - Always test with `npm run build` first
- **Git tags** - `npm version` automatically creates git tags
- **Unpublishing** - You can unpublish within 72 hours, but it's discouraged

## 🎯 Quick Commands Reference

```bash
# Build
npm run build

# Check what will be published
npm pack --dry-run

# Publish patch (1.0.0 -> 1.0.1)
npm run publish:patch

# Publish minor (1.0.0 -> 1.1.0)
npm run publish:minor

# Publish major (1.0.0 -> 2.0.0)
npm run publish:major

# View published package
npm view rn-smooth-ui
```

## 📚 Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Documentation](https://docs.npmjs.com/cli/v8/commands)

