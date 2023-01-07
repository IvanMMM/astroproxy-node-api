import {
  Ports,
  Access,
  Node,
  PortsData,
  Rotation,
  Traffic,
} from "#src/interfaces/responses.interface.js";
import { Astroproxy } from "#src/components/astroproxy.js";
import { NetworkTypes } from "#src/interfaces/enums.interface.js";

export class Port implements Ports.get.Port {
  id: number;
  access: Access;
  archivedAt: any;
  city: any;
  country: string;
  createdAt: string;
  endsAt: string;
  group: any;
  name: string;
  network: NetworkTypes;
  node: Node;
  operator: any;
  ports: PortsData;
  rotation: Rotation;
  traffic: Traffic;
  vpn: any;
  constructor(private readonly astroproxy: Astroproxy, data: Ports.get.Port) {
    Object.assign(this, data);
  }

  async newIp() {
    return await this.astroproxy.newipPort({ id: this.id });
  }

  get httpUrl() {
    const url = new URL(`https://${this.node.ip}`);
    url.port = this.ports.http.toString();
    if (this.access.login) {
      url.username = this.access.login;
    }
    if (this.access.password) {
      url.password = this.access.password;
    }
    return url;
  }

  get socksUrl() {
    const url = new URL(`socks://${this.node.ip}`);
    url.port = this.ports.socks.toString();
    if (this.access.login) {
      url.username = this.access.login;
    }
    if (this.access.password) {
      url.password = this.access.password;
    }
    return url;
  }

  get changeIpUrl() {
    const url = this.httpUrl;
    url.password = "";
    url.username = "";
    url.pathname = "api/changeIP";
    url.search = `apiToken=${this.astroproxy.apiKey}`;
    return url;
  }
}
