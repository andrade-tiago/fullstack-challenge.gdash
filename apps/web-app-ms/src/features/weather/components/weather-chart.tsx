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
  CardFooter,
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
import { Button } from "@/components/ui/button"

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

type ChartConfigKey = keyof typeof chartConfig

type AppLineChartCardProps = {
  className?: string
}

export function WeatherChart(props: AppLineChartCardProps) {
  const weatherLogs = useQuery({
    queryFn: () => fetchWeatherLogs({ pageNumber: 1, pageSize: 7 }),
    queryKey: ["weather", "logs", { pageNumber: 1, pageSize: 7 }]
  })

  const [attribute, setAttribute] =
    React.useState<ChartConfigKey>("temperatureInCelcius")

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
          <Select 
            value={attribute}
            onValueChange={value => setAttribute(value as ChartConfigKey)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um atributo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Atributos</SelectLabel>
                {(Object.keys(chartConfig)).map(itemKey =>
                  <SelectItem key={itemKey} value={itemKey}>
                    {chartConfig[itemKey as ChartConfigKey].label}
                  </SelectItem>
                )}
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
