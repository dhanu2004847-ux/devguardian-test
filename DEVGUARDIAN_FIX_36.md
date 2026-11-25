# DevGuardian AI-suggested fix

Finding ID: 36

## Problem
This rule flags the use of JavaScript's `eval()` function, which executes a string of code in the current execution context.

## Why it matters
Using `eval()` on untrusted input allows attackers to execute arbitrary code within the user's browser, leading to Cross-Site Scripting (XSS), data theft, or session hijacking.

## Suggested fix

**Insecure:**
```javascript
const userInput = "alert('XSS')";
eval(userInput);
```

**Safer:**
```javascript
// Avoid dynamic execution entirely; use safe data parsing or native APIs instead.
const safeData = JSON.parse(userInputString);
```

## Notes
If your code relies on `eval()` to evaluate mathematical expressions or parse data