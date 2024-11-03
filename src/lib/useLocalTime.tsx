import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";

const useLocalTime = ({ day, hour }: { day: string; hour: string }) => {
  const [timeZone, setTimeZone] = useState<string>("Europe/Madrid");
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const fetchGeoIp = async () => {
      const geoIpRequest = fetch("https://get.geojs.io/v1/ip/geo.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo obtener la ubicación del usuario");
          }
          return response.json();
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
      const geoIp = await geoIpRequest;
      setTimeZone(geoIp?.timezone);
    };
    fetchGeoIp();
  }, []);

  useEffect(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(customParseFormat);
    dayjs.locale("es");

    // Define la fecha y hora en formato específico
    const eventDateTime = `${day} ${hour}`; // Ejemplo con tu formato exacto
    const eventTimeMadrid = dayjs.tz(
      eventDateTime,
      "DD/MM/YYYY HH:mm",
      "Europe/Madrid"
    );

    // Convertimos la fecha y hora a Atlantic/Canary
    const eventTime = eventTimeMadrid.tz(timeZone);

    // Formateamos la fecha/hora para mostrarla
    setLocalTime(eventTime.format("HH:mm"));
  }, [timeZone]);
    
    return ( localTime )
};

export default useLocalTime;
