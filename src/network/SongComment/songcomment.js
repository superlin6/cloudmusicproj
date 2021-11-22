import { request } from "../request";

export function getMusicComment(id,offset){
    return request({
        url: "/comment/music",
        params: {
          id,
          offset,
        },
      })
}