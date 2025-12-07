import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { WeatherDatatable } from "../components/weather-datable"
import {
  CloudAlertIcon,
  DropletsIcon,
  SparklesIcon,
  ThermometerIcon,
  UmbrellaIcon,
  WindIcon,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import { WeatherChart } from "../components/weather-chart"
import { useQuery } from "@tanstack/react-query"
import { fetchWeatherLogs } from "../api/fetch-weather-logs"
import { fetchWeatherIaInsight } from "../api/fetch-weather-ia-insight"
import { Button } from "@/components/ui/button"
import { getCSV } from "../api/get-csv"
import { getXlsx } from "../api/get-xlsx"

function WeatherDashoardPage() {
  const weatherLogs = useQuery({
    queryFn: () => fetchWeatherLogs({ pageSize: 1, pageNumber: 1 }),
    queryKey: ["weather", "logs", { pageSize: 1, pageNumber: 1 }]
  })
  const iaInsight = useQuery({
    queryFn: () => fetchWeatherIaInsight({ lastLogs: 24 }),
    queryKey: ["weather", "insight", { lastLogs: 24 }]
  })

  const lastWeatherLog = React.useMemo(
    () => weatherLogs.data?.data.at(-1),
    [weatherLogs.data],
  )

  async function handleDownloadCsv() {
    getCSV({ logs: 100 })
  }
  async function handleDownloadXlsx() {
    getXlsx({ logs: 100 })
  }

  return (
    <div className="p-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <WeatherChart className="md:col-span-2" />
      <Card className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <SparklesIcon className="text-cyan-700" />
            Insights e previsão
          </CardTitle>
        </CardHeader>
        <CardContent>
          {iaInsight.isLoading &&
            <>
              {Array.from({ length: 6 }).map((_, i) =>
                <Skeleton key={i} className="h-4 w-full mb-4 bg-gray-200" />
              )}
              <Skeleton className="h-4 w-2/3 bg-gray-200" />
            </>
          }
          {iaInsight.data &&
            <p className="animate-in fade-in duration-500 slide-in-from-top-2">
              {iaInsight.data}
            </p>
          }
          {iaInsight.isError &&
            <p className="text-gray-500">
              <CloudAlertIcon />
              Não foi possível carregar os insights.
            </p>
          }
        </CardContent>
      </Card>

      {weatherLogs.isLoading && Array.from({ length: 4 }).map((_, i) =>
        <Skeleton key={i} className="w-56 h-40" />
      )}
      {weatherLogs.data &&
        <>
          <Card className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-5">
                <ThermometerIcon className="text-red-600 size-12" />
                Temperatura
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <span className="text-3xl">
                {lastWeatherLog!.temperatureInCelcius.toLocaleString()}°C
              </span>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-5">
                <UmbrellaIcon className="text-violet-900 size-12" />
                Chuva
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <span className="text-3xl">
                {lastWeatherLog!.rainInMm.toLocaleString()}mm
              </span>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-5">
                <WindIcon className="text-gray-500 size-12" />
                Vento
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <span className="text-3xl">
                {lastWeatherLog!.windSpeedInKmPerHour.toLocaleString()} km/h
              </span>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-5">
                <DropletsIcon className="text-cyan-700 size-12" />
                Umidade
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <span className="text-3xl">
                {lastWeatherLog!.relativeHumidityInPercent.toLocaleString()}%
              </span>
            </CardContent>
          </Card>
        </>
      }

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>
            Últimos dados climáticos
          </CardTitle>
          <CardDescription>
            Os últimos dados climáticos coletados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WeatherDatatable className="flex-1" />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            onClick={handleDownloadCsv}
            className="bg-cyan-700 hover:bg-cyan-800">
            Baixar CSV
          </Button>
          <Button
            onClick={handleDownloadXlsx}
            className="bg-amber-600 hover:bg-amber-700">
            Baixar Planilha
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export {
  WeatherDashoardPage,
}
