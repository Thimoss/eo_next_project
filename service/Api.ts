import { ApiUrl } from "../config/app";

class Api {
  public url: string = "";
  public method: "GET" | "POST" | "PATCH" | "DELETE" = "POST";
  public type: "form" | "json" | "multipart" = "json";
  public header: Record<string, string> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public body: any = {};
  public token: string = "";
  public auth: boolean = false;

  public call = async () => {
    let url = ApiUrl + this.url;

    if (this.method === "GET" && this.body) {
      const queryParams = new URLSearchParams(this.body).toString();
      url += "?" + queryParams;
    }

    const headers: Record<string, string> = {
      ...this.header,
    };

    if (this.type !== "multipart") {
      headers["Content-Type"] =
        this.type === "json"
          ? "application/json"
          : "form-data/x-www-form-urlencoded";
    }

    if (this.auth && this.token) {
      headers["Authorization"] = "Bearer " + this.token;
      headers["Accept"] = "application/json";
    }

    let body: BodyInit | null = null;
    if (this.method !== "GET" && this.body) {
      if (this.type === "json") {
        body = JSON.stringify(this.body);
      } else if (this.type === "form") {
        body = new URLSearchParams(this.body).toString();
      } else if (this.type === "multipart") {
        body = this.body;
      }
    }

    const options: RequestInit = {
      method: this.method,
      headers,
      body,
    };

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
