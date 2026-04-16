export type UserRole = "USER" | "ADMIN";

type TokenPayload = {
  role?: string;
  email?: string;
  sub?: string;
};

export const decodeJwtPayload = (token: string): TokenPayload | null => {
  try {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return null;
    }

    const base64Url = tokenParts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const decoded = atob(padded);

    return JSON.parse(decoded) as TokenPayload;
  } catch {
    return null;
  }
};

export const getRoleFromToken = (token: string): UserRole | null => {
  const payload = decodeJwtPayload(token);
  const role = payload?.role;

  return role === "USER" || role === "ADMIN" ? role : null;
};

export const hasRole = (token: string, allowedRoles: UserRole[]): boolean => {
  const role = getRoleFromToken(token);
  return role ? allowedRoles.includes(role) : false;
};
