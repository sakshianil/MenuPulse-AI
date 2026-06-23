const suspiciousPatterns = [
  /ignore (all|any|the) previous instructions/i,
  /reveal (the )?(system|developer) prompt/i,
  /print (your|the) hidden instructions/i,
  /bypass (the )?(guardrails|safety|policy)/i,
  /execute (shell|terminal|system) command/i
];

export function assessPrompt(question: string) {
  const matchedPattern = suspiciousPatterns.find((pattern) => pattern.test(question));
  return {
    safe: !matchedPattern,
    reason: matchedPattern ? "The request attempts to override system boundaries." : null
  };
}
