export function createExpiredToken() {
  const payload = {
    exp: Math.floor(Date.now() / 1000) - 60,
  };

  return `header.${btoa(JSON.stringify(payload))}.signature`;
}
