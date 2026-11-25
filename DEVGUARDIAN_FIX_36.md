# DevGuardian AI-suggested fix

Finding ID: 36

## Problem
This rule flags the use of JavaScript's `eval()` function, which executes arbitrary strings as executable code. 

## Why it matters
Using `eval()` on untrusted input allows attackers to execute arbitrary code within the user's browser, potentially leading to Cross-Site Scripting (XSS), data theft, or session hijacking.

## Suggested fix

**Insecure:**
```javascript
const userInput = "alert('XSS')";
eval(userInput);
```

**Secure:**
```javascript
// Avoid string evaluation entirely by using safer built-in parsers or direct logic
const userInput = '{"message": "Hello"}';
const data = JSON.parse(userInput);
console.log(data.message);
```

## Notes
If your code relies on dynamic property access (e.g., `eval("obj." + propName)`), replace it with standard bracket notation like `obj[propName]`. Ensure that any complex parsing logic is refactored to use dedicated APIs rather than dynamic code execution.