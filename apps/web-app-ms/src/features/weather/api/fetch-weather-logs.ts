import { api } from "@/shared/api/api"
import type { Pagination } from "@/shared/types/pagination"
import type { WeatherLog } from "../types/weather/weather-log"

type FetchUserOptions = {
  pageNumber: number
  pageSize: number
}

async function fetchWeatherLogs(options: FetchUserOptions) {
  const response = await api.get<Pagination<WeatherLog>>('weather/logs', {
    params: {
      pageNumber: options.pageNumber,
      pageSize: options.pageSize,
    },
  })

  return response.data
}

export {
  fetchWeatherLogs,
}