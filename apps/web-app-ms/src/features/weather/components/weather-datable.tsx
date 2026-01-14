import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { fetchWeatherLogs } from "../api/fetch-weather-logs"
import { TimeFormat } from "@/shared/config/time-format"

type WeatherDatatableProps = {
  className?: string
} 

const logs = 7

function WeatherDatatable(props: WeatherDatatableProps) {
  const weatherLogs = useQuery({
    queryFn: () => fetchWeatherLogs({ pageSize: logs, pageNumber: 1 }),
    queryKey: ["weather", "logs", { pageSize: logs, pageNumber: 1 }]
  })

  return (
    <Table {...props}>
      <TableCaption hidden>
        Últimos dados climáticos.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead/>
          <TableHead>Temperatura</TableHead>
          <TableHead>Sensação</TableHead>
          <TableHead>Vento</TableHead>
          <TableHead>Pressão</TableHead>
          <TableHead>Chuva</TableHead>
          <TableHead>Precipitação</TableHead>
          <TableHead>Umidade</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {weatherLogs.isLoading && Array.from({ length: logs }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 8 }).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-5 w-1/3" />
              </TableCell>
            ))}
          </TableRow>
        ))}
        {weatherLogs.data && weatherLogs.data.data.map(item =>
          <TableRow key={item.id}>
            <TableCell>
              {new Date(item.createdAt).toLocaleTimeString([], TimeFormat)}
            </TableCell>
            <TableCell>
              {item.temperatureInCelcius.toLocaleString()}°C
            </TableCell>
            <TableCell>
              {item.apparentTemperatureInCelcius.toLocaleString()}°C
            </TableCell>
            <TableCell>
              {item.windSpeedInKmPerHour.toLocaleString()} Km/h
            </TableCell>
            <TableCell>
              {item.surfacePressureInHpa.toLocaleString()} hPa
            </TableCell>
            <TableCell>
              {item.rainInMm.toLocaleString()}mm
            </TableCell>
            <TableCell>
              {item.precipitationInMm.toLocaleString()}mm
            </TableCell>
            <TableCell>
              {item.relativeHumidityInPercent.toLocaleString()}%
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export {
  WeatherDatatable,
}
