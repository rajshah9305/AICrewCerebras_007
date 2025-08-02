# 🔄 Complete Node.js Reset Guide

This guide provides step-by-step instructions for a complete reset and fresh installation of Node.js on your system. This is useful when you encounter persistent issues with your Node.js environment, such as package conflicts, permission errors, or unexpected behavior.

## 1. Uninstall Node.js and npm

### macOS

The recommended way to uninstall Node.js and npm on macOS is by using Homebrew.

```bash
brew uninstall node
```

If you didn't use Homebrew, you can manually remove the files:

```bash
sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}
rm -rf ~/.npm
rm -rf ~/.nvm # If you use nvm
rm -rf ~/.node-gyp
```

### Windows

On Windows, you can uninstall Node.js from the "Add or remove programs" settings.

1.  Open the Start Menu and search for "Add or remove programs".
2.  Find "Node.js" in the list and click "Uninstall".
3.  Follow the prompts to complete the uninstallation.

After uninstalling, you should also remove the following directories:

*   `C:\Program Files\nodejs`
*   `C:\Users\<Your_Username>\AppData\Roaming\npm`
*   `C:\Users\<Your_Username>\AppData\Roaming\npm-cache`

## 2. Clear npm Cache

After uninstalling Node.js, it's a good practice to clear the npm cache.

```bash
npm cache clean --force
```

## 3. Install Node.js

### macOS

The recommended way to install Node.js on macOS is by using Homebrew.

```bash
brew install node
```

### Windows

Download the official installer from the [Node.js website](https://nodejs.org/). It's recommended to download the LTS (Long-Term Support) version.

## 4. Verify Installation

After the installation is complete, verify that Node.js and npm are installed correctly.

```bash
node -v
npm -v
```

You should see the versions of Node.js and npm printed to the console.

## 5. (Optional) Install a Node Version Manager

A Node Version Manager (nvm) allows you to easily switch between different Node.js versions. This is highly recommended for developers.

### nvm (macOS and Linux)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

### nvm-windows (Windows)

Download and run the installer from the [nvm-windows repository](https://github.com/coreybutler/nvm-windows/releases).

## 6. Reinstall Global Packages

If you had any global npm packages installed, you'll need to reinstall them.

```bash
npm install -g <package-name>
```

For example, to reinstall `yarn`:

```bash
npm install -g yarn
```

