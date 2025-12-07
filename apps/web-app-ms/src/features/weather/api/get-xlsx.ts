import { api } from "@/shared/api/api"

type GetXlsxOptions = {
  logs: number
}

async function getXlsx(options: GetXlsxOptions) {
  try {
    const response = await api.get('weather/logs/export/xlsx', {
      params: {
        limit: options.logs,
      },
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "weather.xlsx");

    document.body.appendChild(link);
    link.click();
  } catch {}
}

export {
  getXlsx
}
