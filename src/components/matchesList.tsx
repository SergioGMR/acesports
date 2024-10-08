interface Matches {
    updated: string;
    matches: Match[];
}
interface Match {
    title: string;
    teams: {
        home: string | null;
        away: string | null;
    };
    sport: string;
    competition: string;
    date: {
        day: string;
        time: string;
        zone: string;
    };
    channels: string[];
}
import json from "@data/data.json";
const { data } = json

const MatchesList = () => {
    return (
        data.map((match: Match, index) => (
            <div
                id={index.toString()}
                className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4 capitalize">
                    {match.title}
                </h2>
                <p className="text-lg text-gray-700 mb-2 capitalize">
                    {
                        match.teams.home && match.teams.away &&
                        <section>
                            <strong>Equipos: </strong>
                            <ul className="ml-6">
                                <li>
                                    <span className="mr-4">
                                        Local:
                                    </span>
                                    {match.teams.home}
                                </li>
                                <li>
                                    <span className="mr-4">
                                        Visitante:
                                    </span>
                                    {match.teams.away}
                                </li>
                            </ul>
                        </section>
                    }
                </p>
                <p className="text-md text-gray-600 capitalize">
                    <strong>Sport:</strong> {match.sport}
                </p>
                <p className="text-md text-gray-600 capitalize">
                    <strong>Competition:</strong>{" "}
                    {match.competition}
                </p>
                <p className="text-md text-gray-600">
                    <strong>Fecha:</strong> {match.date.day},{" "}
                    <span className="uppercase">{match.date.time} ({match.date.zone})</span>
                </p>

                <section className="mt-1">
                    <ul className="mt-2 list-disc list-inside gap-y-3 justify-end">
                        {match.channels.map((channel) => (
                            <a
                                id={channel}
                                className="text-center text-white rounded-md bg-blue-500 px-2 py-1 mt-2 inline-block w-full"
                                href={channel} >
                                Ver ahora
                            </a>
                        ))}
                    </ul>
                </section >
            </div >
        ))
    )
}

export default MatchesList;