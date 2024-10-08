async function extractMatchData(element, cardSelectors) {
    try {
        let titleText = await element.$eval(cardSelectors.title, el => el.textContent.trim().toLowerCase());
        titleText = titleText.replace(/\s*-\s*/, ' - '); // Asegura que haya espacio alrededor de "-"

        // Lista ampliada de términos de exclusión
        const exclusionKeywords = ['matches', 'match', 'round', 'stage', 'zone', 'quarters', 'semi', 'final', 'draw', 'day'];
        const containsExclusion = exclusionKeywords.some(keyword => titleText.includes(keyword));

        let homeTeam = null;
        let awayTeam = null;

        if (!containsExclusion) {
            // Extraer local y visitante cuando el título tiene un formato de partido regular
            const teams = titleText.split(' - ').map(t => t.trim());
            homeTeam = teams[0];
            awayTeam = teams.length > 1 ? teams[1] : null;
        }

        const sportText = await element.$eval(cardSelectors.sport, el => el.textContent.toLowerCase().replace('deporte: ', '').trim());
        const competitionText = await element.$eval(cardSelectors.competition, el => el.textContent.toLowerCase().replace('competición: ', '').trim());
        const dateText = await element.$eval(cardSelectors.date, el => el.textContent.trim().toLowerCase());
        const [day, time, zone] = dateText.replace('fecha: ', '').split(/,|hora:|cet/).map(t => t.trim());

        return {
            title: titleText,
            teams: { home: homeTeam, away: awayTeam },
            sport: sportText,
            competition: competitionText,
            date: { day, time, zone: 'cet' }
        };
    } catch (error) {
        console.error("Error extracting match data: ", error);
        throw error;
    }
}
module.exports = { extractMatchData };