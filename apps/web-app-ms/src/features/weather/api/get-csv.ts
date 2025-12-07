import { api } from "@/shared/api/api"

type GetCSVOptions = {
  logs: number
}

async function getCSV(options: GetCSVOptions) {
  try {
    const response = await api.get('weather/logs/export/csv', {
      params: {
        limit: options.logs,
      },
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "weather.csv");

    document.body.appendChild(link);
    link.click();
  } catch {}
}

export {
  getCSV
}
