export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}
