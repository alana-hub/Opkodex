export function isValidNin(value) {
    return /^\d{16}$/.test(value.trim());
}
export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
export function isValidRwandaPhone(value) {
    const normalized = value.replace(/[\s()-]/g, "");
    return /^(?:\+250|250|0)7\d{8}$/.test(normalized);
}
export function isFutureOrToday(dateValue) {
    if (!dateValue)
        return false;
    const selected = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(selected.getTime()))
        return false;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return selected >= today;
}
export function setFieldValidity(id, message) {
    const element = document.getElementById(id);
    element?.setCustomValidity(message);
}
export function showMessage(target, message, kind) {
    if (!target)
        return;
    const styles = {
        success: "border-green-200 bg-green-50 text-green-800",
        error: "border-red-200 bg-red-50 text-red-800",
        info: "border-sky-200 bg-sky-50 text-sky-800"
    };
    target.className =
        `rounded-2xl border p-4 text-sm ${styles[kind]}`;
    target.innerHTML = message;
    target.classList.remove("hidden");
}
//# sourceMappingURL=validation.js.map