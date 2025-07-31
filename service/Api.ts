/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiUrl } from "../config/app";

class Api {
  public url: string = "";
  public method: "GET" | "POST" | "PATCH" | "DELETE" = "POST";
  public auth: boolean = false;
  public type: "form" | "json" | "multipart" = "json";
  public token: string = "";
  public header: any = {};
  public body: any = {};

  public call = async () => {
    let url = ApiUrl + this.url;
    // const headers: any = {
    //   ...this.header,
    //   ["tokken_lpppu_usu"]: TOKEN_HEADER,
    // };

    // Handle GET parameters
    if (this.method === "GET" && this.body) {
      const queryParams = new URLSearchParams(this.body).toString();
      url += "?" + queryParams;
    }

    // Set Content-Type hanya untuk non-GET
    // if (this.method !== "GET") {
    //   if (this.type === "json") {
    //     headers["Content-Type"] = "application/json";
    //   } else if (this.type === "form") {
    //     headers["Content-Type"] = "application/x-www-form-urlencoded";
    //   }
    //   // Untuk multipart, biarkan browser set Content-Type otomatis
    // }

    // Handle Authorization
    // if (this.auth && this.token) {
    //   headers["Authorization"] = "Bearer " + this.token;
    //   headers["Accept"] = "application/json";
    // }

    // Siapkan body
    let body: BodyInit | null = null;
    if (this.method !== "GET") {
      if (this.type === "json") {
        body = JSON.stringify(this.body);
      } else if (this.type === "form") {
        body = new URLSearchParams(this.body).toString();
      } else {
        body = this.body; // FormData
      }
    }

    const options: RequestInit = {
      method: this.method,
      //   headers: headers,
    };

    if (body !== null) {
      options.body = body;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API call error:", error);
      return {
        meta: {
          code: 400,
          status: "Bad Request",
          message: "Bad Request",
        },
        data: error,
      };
    }
  };
}

export default Api;
