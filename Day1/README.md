# System Information CLI

A simple TypeScript Node.js CLI that displays information.

## Installation

```bash
npm run build
```

## Build

```bash
npm test
```

## Usage

```bash
node dist/index.js <command>
```

Available commands:

+ `version`: Show Node.js version
+ `os`: Show operating system information
+  `memory`: Show system memory
+  `cwd`: Show current directory
+  `environment`: Show environment variables



## Examples

```bash
node dist/index.js version
node dist/index.js os
node dist/index.js memory
node dist/index.js cwd
node dist/index.js environment
```