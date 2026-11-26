# DevGuardian AI-suggested fix

Finding ID: 53

## Problem
The code passes user input (`req.body.expression`) directly into JavaScript's `eval()` function inside an Express route handler. This allows arbitrary JavaScript code execution via string concatenation or evaluation.

## Why it matters
An attacker can supply malicious JavaScript payloads in the request body to execute arbitrary code within the application process. This could lead to full system compromise, data theft, or denial of service.

## Suggested fix

**Before**
```javascript
app.post('/calc', (req, res) => {
  res.send(String(eval(req.body.expression)));
});
```

**After**
```javascript
const math = require('mathjs');

app.post('/calc', (req, res) => {
  try {
    const result = math.evaluate(req.body.expression);
    res.send(String(result));
  } catch (err) {
    res.status(400).send('Invalid expression');
  }
});
```

## Notes
This fix assumes the endpoint is intended to act as a mathematical calculator. If a library like `mathjs` cannot be added to your dependencies, you should implement a dedicated, safe math parser rather than using native code execution functions.