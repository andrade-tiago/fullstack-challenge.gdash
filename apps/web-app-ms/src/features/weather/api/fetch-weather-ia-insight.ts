import { api } from "@/shared/api/api"

type Options = {
  lastLogs: number
}

type Response = {
  insightText: string
}

async function fetchWeatherIaInsight(options: Options): Promise<string> {
  const response = await api.get<Response>('weather/insights', {
    params: {
      lastLogs: options.lastLogs,
    },
  })

  return response.data.insightText
}

export {
  fetchWeatherIaInsight,
}
