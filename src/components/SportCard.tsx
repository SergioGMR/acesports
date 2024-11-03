import type { SportEvent } from "@/interfaces/Event";
import useLocalTime from '@/lib/useLocalTime';

export default function SportCard({ event }: { event: SportEvent }) {
  const localTime = useLocalTime({
    day: event.date.day,
    hour: event.date.hour,
  });

  const getLowerSport = (sport: string): string => {
    return sport.toLowerCase().replace(/\s*\([^)]*\)/, "");
  };

  let lowerSport = getLowerSport(event.sport);
  return (
    <div
      className="flex-col card relative bg-cover bg-center rounded-xl shadow-lg p-6 h-80"
      style={{ backgroundImage: `url('/bgsports/${lowerSport}.webp')` }}
      data-sport={event.sport}
      data-date={event.date.day}
      data-local={event.teams.local}
      data-visitor={event.teams.visitor}
    >
      <div className="z-0 absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent opacity-90 rounded-xl"></div>

      <div className="flex justify-between text-center">
        <div className="flex flex-col gap-y-2 w-1/3">
          <span className="bg-yellow-500 searchable text-black text-xs font-bold py-1 px-3 rounded-full capitalize">
            {event.sport}
          </span>
          {event.details.competition && (
            <span
              title={event.details.competition}
              className="bg-gray-700 z-20 overflow-hidden truncate searchable text-white text-xs font-semibold py-1 px-3 rounded-full capitalize"
            >
              {event.details.competition}
            </span>
          )}
          {event.details.round && (
            <span className="bg-sky-200 z-20 overflow-hidden truncate  searchable text-black text-xs font-semibold py-1 px-3 rounded-full capitalize">
              {event.details.round}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="bg-blue-500 z-20 overflow-hidden truncate text-white text-xs font-bold py-1 px-3 rounded-full searchable capitalize">
            {event.date.day}
          </span>
          <span
            className="bg-gray-700 z-20 overflow-hidden truncate text-white text-xs font-semibold py-1 px-3 rounded-full event-time searchable uppercase"
            data-time={`${event.date.day} ${event.date.hour}`}
            data-zone={event.date.zone}
          >
            <p className="text-center">{localTime}</p>
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-white mt-4">
        {event.teams.local && event.teams.visitor ? (
          <>
            <h2
              className="text-2xl font-extrabold capitalize searchable"
              data-local={event.teams.local.name}
            >
              {event.teams.local.name}
            </h2>
            {event.teams.local.image && event.teams.visitor.image && (
              <section className="flex gap-x-3 items-center justify-center">
                <div>
                  <img
                    className="h-auto w-auto"
                    src={event.teams.local.image}
                    alt=""
                  />
                </div>
                <div className="text-lg font-semibold text-orange-500 my-4">
                  V.S.
                </div>
                <div>
                  <img
                    className="h-auto w-auto"
                    src={event.teams.visitor.image}
                    alt=""
                  />
                </div>
              </section>
            )}
            <h2
              className="text-2xl font-extrabold capitalize searchable"
              data-visitor={event.teams.visitor.name}
            >
              {event.teams.visitor.name}
            </h2>
          </>
        ) : (
          <h2 className="text-2xl font-bold capitalize text-center w-full text-purple-100 searchable">
            {event.details.competition} - {event.details.round}
          </h2>
        )}
      </div>

      <div className="absolute inset-0 flex items-end justify-center z-10 bottom-4 gap-x-2">
        {event.links &&
          event.links.map((link: string, index: number) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all text-sm"
            >
              {index + 1}
            </a>
          ))}
      </div>
    </div>
  );
}
