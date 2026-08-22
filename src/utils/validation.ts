export function isValidNin(value: string): boolean {
  return /^\d{16}$/.test(value.trim());
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidRwandaPhone(value: string): boolean {
  const normalized = value.replace(/[\s()-]/g, "");
  return /^(?:\+250|250|0)7\d{8}$/.test(normalized);
}

export function isFutureOrToday(dateValue: string): boolean {
  if (!dateValue) return false;

  const selected = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return false;

  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  return selected >= today;
}

export function setFieldValidity(
  id: string,
  message: string
): void {
  const element = document.getElementById(
    id
  ) as HTMLInputElement | HTMLSelectElement | null;

  element?.setCustomValidity(message);
}

export function showMessage(
  target: HTMLElement | null,
  message: string,
  kind: "success" | "error" | "info"
): void {
  if (!target) return;

  const styles: Record<typeof kind, string> = {
    success:
      "border-green-200 bg-green-50 text-green-800",
    error:
      "border-red-200 bg-red-50 text-red-800",
    info:
      "border-sky-200 bg-sky-50 text-sky-800"
  };

  target.className =
    `rounded-2xl border p-4 text-sm ${styles[kind]}`;

  target.innerHTML = message;
  target.classList.remove("hidden");
}
