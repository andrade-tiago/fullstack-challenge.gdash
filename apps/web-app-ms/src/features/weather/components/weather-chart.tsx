import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from "react"
import dayjs from "dayjs"
import { useQuery } from "@tanstack/react-query"
import { fetchWeatherLogs } from "../api/fetch-weather-logs"

const chartConfig = {
  temperatureInCelcius: {
    label: "Temperatura (°C)",
    color: "var(--chart-1)",
  },
  apparentTemperatureInCelcius: {
    label: "Sensação (°C)",
    color: "var(--chart-4)",
  },
  rainInMm: {
    label: "Rain (mm)",
    color: "var(--char-2)",
  },
  windSpeedInKmPerHour: {
    label: "Vento (km/h)",
    color: "var(--char-3)",
  },
} satisfies ChartConfig

type AppLineChartCardProps = {
  className?: string
}

export function WeatherChart(props: AppLineChartCardProps) {
  const weatherLogs = useQuery({
    queryFn: () => fetchWeatherLogs({ pageNumber: 1, pageSize: 7 }),
    queryKey: ["weather", "logs", { pageNumber: 1, pageSize: 7 }]
  })

  const [attribute, setAttribute] =
    React.useState<keyof typeof chartConfig>("temperatureInCelcius")

  const chartData = React.useMemo(() =>
    weatherLogs.data?.data.map(item => ({ ...item,
      createdAt: dayjs(item.createdAt).format("HH:mm"),
    })).reverse(),
    [ weatherLogs.data ]
  )

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>
          Variação climática
        </CardTitle>
        <CardDescription>
          Exibindo os últimos 7 dados coletados
        </CardDescription>
        <CardAction>
          <Select value={attribute} onValueChange={setAttribute}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um atributo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Atributos</SelectLabel>
                <SelectItem value="temperatureInCelcius">Temperatura</SelectItem>
                <SelectItem value="rainInMm">Chuva</SelectItem>
                <SelectItem value="windSpeedInKmPerHour">Vento</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent />}
            />
            <Area
              dataKey={attribute}
              fill={chartConfig[attribute].color}
              fillOpacity={0.4}
              stroke={chartConfig[attribute].color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
