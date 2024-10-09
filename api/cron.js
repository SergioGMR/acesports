import { spawn } from 'child_process';
import path from 'path';

// Función que ejecuta un comando en la terminal
function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, {
            stdio: 'inherit',
            shell: true,
        });

        process.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(`Command failed with exit code ${code}`);
            }
        });
    });
}

export default async function handler(req, res) {
    try {
        // Instalar Playwright (u otras dependencias necesarias)
        await runCommand('npx', ['playwright', 'install']);

        // Ejecutar el script index.cjs después de instalar las dependencias
        const scriptPath = path.resolve('./src/services/index.cjs');
        await runCommand('node', [scriptPath]);

        res.status(200).json({ message: 'Cron job executed successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Cron job failed: ${error}` });
    }
}
