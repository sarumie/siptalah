import axios from "axios";
import { baseUrl } from "./utils";

export default axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: 10000
});

