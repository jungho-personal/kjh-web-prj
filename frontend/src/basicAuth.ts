export function makeBasicAuth(username: string, password: string) {
  const token = btoa(`${username}:${password}`);
  return `Basic ${token}`;
}
