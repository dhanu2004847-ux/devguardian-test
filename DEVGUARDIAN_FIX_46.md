# DevGuardian AI-suggested fix

Finding ID: 46

## Problem
This rule flags the use of the MD5 hashing algorithm, specifically in the context of handling passwords or sensitive credentials.

## Why it matters
MD5 is cryptographically broken and fast to compute, making it trivial for attackers to crack passwords using precomputed rainbow tables or brute-force attacks. 

## Suggested fix

**Insecure:**
```javascript
const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}
```

**Safer:**
```javascript
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}
```

## Notes
If you are migrating legacy MD5 password hashes, you will need to implement a "lazy migration" strategy (re-hashing the password with bcrypt upon successful login) to handle existing user accounts smoothly.