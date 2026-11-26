# DevGuardian AI-suggested fix

Finding ID: 92

## Problem
The code passes user-supplied input directly from `req.body.expression` into the dangerous `eval()` function and immediately sends the result back to the client via `res.send()`. This leads to both arbitrary code execution on the server and potential Cross-Site Scripting (XSS).

## Why it matters
Using `eval()` on untrusted input allows attackers to execute arbitrary JavaScript code within the context of your Node.js application, potentially leading to Remote Code Execution (RCE). Furthermore, returning the unescaped result directly to the client via `res.send()` can execute malicious scripts in the user's browser if the output is rendered in an HTML context.

## Suggested fix

**Before**
```javascript
app.post('/calc', (req, res) => {
  res.send(String(eval(req.body.expression)));
});
```

**After**
```javascript
const { evaluate } = require('mathjs'); // Or another safe math parsing library

app.post('/calc', (req, res) => {
  try {
    const result = evaluate(req.body.expression);
    res.send(String(result));
  } catch (err) {
    res.status(400).send('Invalid expression');
  }
});
```

## Notes
Evaluating mathematical expressions should never be done using native `eval()`. The suggested fix introduces a safe math evaluation library (`mathjs`) to prevent code injection vulnerabilities, while wrapping the logic in a `try/catch` block to handle malformed user input gracefully.