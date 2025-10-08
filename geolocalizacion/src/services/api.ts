const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.json();
}

export const api = {
  getUsuarios: () => request("/usuarios"),
  getLugares: () => request("/lugares"),
  getRutas: () => request("/rutas"),
  getRutaById: (id: number) => request(`/rutas/${id}`),
  getRutaDetalle: (idRuta: number) => request(`/ruta-detalle?r=${idRuta}`) // si usas query o ajusta path
  // ajusta según endpoints reales
};
