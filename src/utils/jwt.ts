import { jwtDecode } from "jwt-decode";

type Payload = {
  cracha: string;
  nome: string;
  cargo: string;
  exp: number;
};

export function validToken(token: string | null): boolean {
  if (token) {
    try {
      const { exp } = jwtDecode<Payload>(token);
      const agora = Math.floor(Date.now() / 1000);
      return exp > agora;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export function getToken(token: string | null): Payload | null {
  if (token) {
    try {
      const payload = jwtDecode<Payload>(token);
      return payload;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
    }
  }
  return null;
}
