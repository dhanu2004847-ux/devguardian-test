# DevGuardian AI-suggested fix

Finding ID: 40

## Problem
This rule flags the direct writing of untrusted user input into an HTTP response using methods like `res.send()`, `res.write()`, or `res.end()` in Express.js. This bypasses automated framework escape mechanisms and often leads to Reflected Cross-Site Scripting (XSS).

## Why it matters
If an attacker injects malicious JavaScript into the input, the browser will execute it in the context of the victim's session. This can lead to session hijacking, credential theft, or unauthorized actions performed on behalf of the user.

## Suggested fix

**Insecure:**
```javascript
app.get('/search', (req, res) => {
  // Directly writing unsanitized user input to the response
  res.send(`<h1>Results for: ${req.query.q}</h1>`);
});
```

**Secure:**
```javascript
const escapeHtml = require('escape-html');

app.get('/search', (req, res) => {
  // Explicitly HTML-encode the input before rendering it
  const safeQuery = escapeHtml(req.query.q);
  res.send(`<h1>Results for: ${safeQuery}</h1>`);
});
```

## Notes
If you are returning JSON via `res.json()`, the risk of HTML-based XSS is generally mitigated, but you should still ensure proper `Content-Type` headers are set. For complex HTML rendering, use a templating engine (like EJS, Pug, or Handlebars) that automatically escapes variables by default.