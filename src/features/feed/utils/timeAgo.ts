export function timeAgo(createdAt: string | undefined): string {
  if (!createdAt) return "";

  const agora = new Date();
  const criado = new Date(createdAt);
  let diffMs = agora.getTime() - criado.getTime();
  if (diffMs < 0) diffMs = 0;

  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin}m`;

  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h`;

  const mesmoAno = agora.getFullYear() === criado.getFullYear();
  const options: Intl.DateTimeFormatOptions = mesmoAno
    ? { day: "numeric", month: "short" }
    : { day: "numeric", month: "short", year: "numeric" };

  return criado.toLocaleDateString("pt-BR", options);
}
