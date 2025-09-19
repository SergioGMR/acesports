/**
 * Formatea una fecha según las preferencias locales
 */
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

/**
 * Convierte una fecha en formato DD/MM/YYYY a objeto Date
 */
export function parseSpanishDate(dateString: string, defaultYear = new Date().getFullYear()): Date | null {
    if (!dateString) return null;
    
    try {
        const parts = dateString.split('/');
        if (parts.length < 2) return null;
        
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Los meses en JavaScript van de 0-11
        const year = parts.length > 2 ? parseInt(parts[2], 10) : defaultYear;
        
        const date = new Date(year, month, day);
        
        // Validar que la fecha sea válida
        if (isNaN(date.getTime())) {
            return null;
        }
        
        return date;
    } catch (error) {
        console.error("Error al parsear la fecha:", error);
        return null;
    }
}

/**
 * Convierte una hora española (Europe/Madrid) a la zona horaria local del usuario
 */
export function convertTimeToLocalTimezone(
    dateString: string,
    timeString: string,
    fromTimezone = 'Europe/Madrid'
): string {
    try {
        // Validar formato de entrada
        if (!dateString || !timeString) return timeString;

        // Parsear la fecha española
        const dateParts = dateString.split('/');
        if (dateParts.length < 2) return timeString;

        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Los meses en JavaScript van de 0-11
        const year = dateParts.length > 2 ? parseInt(dateParts[2], 10) : new Date().getFullYear();

        // Validar fecha
        if (isNaN(day) || isNaN(month) || isNaN(year)) return timeString;

        // Parsear la hora
        const timeParts = timeString.split(':');
        if (timeParts.length < 2) return timeString;

        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);

        // Validar hora
        if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return timeString;
        }

        // Crear fecha como si fuera en Madrid (UTC+1/+2 dependiendo del DST)
        // Usar Intl.DateTimeFormat para una conversión más precisa
        const madridDate = new Date(year, month, day, hour, minute);

        // Crear un formatter para simular la zona horaria de Madrid
        const madridFormatter = new Intl.DateTimeFormat('es-ES', {
            timeZone: 'Europe/Madrid',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        // Crear un formatter para la zona horaria local
        const localFormatter = new Intl.DateTimeFormat('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        // Formatear en zona horaria local
        return localFormatter.format(madridDate);
    } catch (error) {
        console.error("Error al convertir la hora:", error);
        return timeString;
    }
}
