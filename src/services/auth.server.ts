export interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims: { [key: string]: string };
}

export function getUserInfo(request: Request): User | null {
  const header = request.headers.get('x-ms-client-principal');
  if (header) {
    const encoded = Buffer.from(header, 'base64');
    const principalJson = encoded.toString('ascii');
    const principal = JSON.parse(principalJson);
    return principal as User;
  }
  return null;
}

export function getUserId(request: Request): string | null {
  const user = getUserInfo(request);
  if (user) {
    return user.userId;
  }
  return null;
}
