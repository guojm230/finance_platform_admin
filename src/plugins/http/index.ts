import {AxiosInstance} from "axios";
import {Axios} from "@/plugins/http/type";
import instance from './confg'
import axiosQueue from './AxiosQueue'

function wrap(ins: AxiosInstance): Axios {
  const axios = ins as Axios;
  for (let key in axiosQueue) {
    if ( typeof axiosQueue[key] === 'function'){
      axios[key] = axiosQueue[key].bind(this);
    } else {
      axios[key] = axiosQueue[key];
    }
  }

  return axios;
}

const axios = wrap(instance);

export default axios;


