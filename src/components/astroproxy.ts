import got, {Got} from "got";
import {ApiTokenInvalid, ApiTokenMissing, FailedResponse,} from "#src/interfaces/errors.interface.js";
import {config} from "#src/config/index.js";
import {Balance, Calculate, Cities, Countries, Lists, Operators, Ports,} from "#src/interfaces/responses.interface.js";
import {Port} from "#src/components/port.js";
import {Request} from "#src/interfaces/requests.interface.js";

type pageInfo = Omit<Ports.get.RootObject, "data" | "status">;

export class Astroproxy {
  private got: Got;
  constructor(public readonly apiKey: string) {
    if (!apiKey) {
      throw new ApiTokenMissing();
    }
    if (apiKey.length !== 16) {
      throw new ApiTokenInvalid();
    }
    this.got = got.extend({
      prefixUrl: config.baseUrlV1,
      searchParams: {
        token: apiKey,
      },
    });
  }

  private checkResponseStatus(json: {
    status: string;
    message?: string;
    data?: any;
  }) {
    if (json.status !== "ok") {
      throw new FailedResponse(
        json.message || json.data?.message || "Unknown error"
      );
    }
  }

  async getBalance() {
    const response = await this.got.get("balance").json<Balance.RootObject>();
    this.checkResponseStatus(response);
    return response.data;
  }

  async getPorts(payload?: {
    raw?: false;
    options?: Request.Ports.get;
  }): Promise<{ page: pageInfo; data: Port[] }>;
  async getPorts(payload?: {
    raw?: true;
    options?: Request.Ports.get;
  }): Promise<{ page: pageInfo; data: Ports.get.Data }>;
  async getPorts(payload?: { raw?: boolean; options?: Request.Ports.get }) {
    const response = await this.got
      .get("ports", {
        searchParams: payload?.options || {},
      })
      .json<Ports.get.RootObject>();
    this.checkResponseStatus(response);
    const { status, data, ...page } = response;
    if (!payload?.raw) {
      return {
        page,
        data: data.ports.map((data) => new Port(this, data)),
      };
    } else {
      return {
        page,
        data,
      };
    }
  }

  async createPort(payload: Request.Ports.create) {
    const response = await this.got
      .post(`ports`, {
        form: payload,
      })
      .json<Ports.create.RootObject>();
    this.checkResponseStatus(response);
    return response;
  }

  async deletePort(payload: Request.Ports.remove) {
    const response = await this.got
      .delete(`ports/${payload.id}`)
      .json<Ports.remove.RootObject>();
    this.checkResponseStatus(response);
    return true;
  }

  async updatePort(payload: Request.Ports.update & { id: number }) {
    return this.got
      .patch(`ports/${payload.id}`, {
        form: payload,
      })
      .json<Ports.update.RootObject>();
  }

  async renewPort(payload: Request.Ports.renew) {
    const response = await this.got
      .patch(`ports/${payload.id}/renew`, {
        form: payload,
      })
      .json<Ports.renew.RootObject>();
    this.checkResponseStatus(response);
    return response;
  }

  async newipPort(payload: Request.Ports.newip) {
    const response = await this.got.get(`ports/${payload.id}/newip`, {
      throwHttpErrors: false,
    });
    if (response.statusCode > 400) {
      const body: Ports.newip.fail.RootObject = JSON.parse(response.body);
      this.checkResponseStatus(body);
    }
    const body: Ports.newip.ok.RootObject = JSON.parse(response.body);
    return body.data;
  }

  async getCountries(payload: Request.Countries = {}) {
    const response = await this.got
      .get(`countries`, {
        searchParams: payload || {},
      })
      .json<Countries.RootObject>();
    this.checkResponseStatus(response);
    return response.data;
  }

  async getCities(payload: Request.Cities) {
    const response = await this.got
      .get(`cities`, {
        searchParams: payload || {},
      })
      .json<Cities.RootObject>();
    this.checkResponseStatus(response);
    return response.data;
  }

  async getOperators(payload: Request.Operators) {
    const response = await this.got
      .get(`operators`, {
        searchParams: payload || {},
      })
      .json<Operators.RootObject>();
    this.checkResponseStatus(response);
    return response.data;
  }

  async getLists() {
    const response = await this.got.get(`lists`).json<Lists.RootObject>();
    this.checkResponseStatus(response);
    return response.data;
  }

  async calculate(payload: Request.Ports.create) {
    const response = await this.got
      .post(`calculate`, { form: payload })
      .json<Calculate.RootObject>();
    this.checkResponseStatus(response);
    return response.data;
  }
}
