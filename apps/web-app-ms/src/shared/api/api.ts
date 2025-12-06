import { configuration } from "@/env";
import axios from "axios";

const api = axios.create({
  baseURL: configuration.api.url,
  headers: {
    "Content-Type": "application/json",
  },
})

export {
  api,
}
