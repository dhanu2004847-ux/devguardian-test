# DevGuardian AI-suggested fix

Finding ID: 39

## Problem
This rule flags the use of Node.js `child_process` modules (such as `exec` or `spawn`) which can execute arbitrary system commands.

## Why it matters
If user-supplied input is passed directly to these functions without proper sanitization, it can lead to Remote Code Execution (RCE), allowing an attacker to compromise the underlying system.

## Suggested fix

**Before (Insecure):**
```javascript
const { exec } = require('child_process');

// Unsafe: directly interpolating user input into the shell command
exec(`ls -l ${req.query.path}`, (error, stdout, stderr) => {
  // handle output
});
```

**After (Safer):**
```javascript
const { execFile } = require('child_process');

// Safe: executing a specific binary with arguments passed as an array, 
// avoiding shell interpretation entirely.
execFile('/bin/ls', ['-l', req.safePath], (error, stdout, stderr) => {
  // handle output
});
```

## Notes
Switching from `exec` to `execFile` or `spawn` prevents shell injection, but you must still validate and sanitize any input passed as command arguments to ensure the application logic remains secure.