import {
  NetworkTypes,
  VpnType,
  RotationType,
  RotationTimeType,
  ResponseStatus,
} from "#src/interfaces/enums.interface.js";

export interface Rotation {
  by: RotationType;
  type?: RotationTimeType;
  time?: number;
}

export interface Node {
  address: string;
  ip: string;
}

export interface PortsData {
  http: number;
  socks: number;
}

export interface Access {
  login?: string;
  password?: string;
  ip?: string;
}

export interface Traffic {
  total: number;
  left: number;
  used: number;
  total_mb: number;
  left_mb: number;
  used_mb: number;
}

export declare module Balance {
  export interface Data {
    balance: number;
    currency: string;
  }

  export interface RootObject {
    status: ResponseStatus;
    data: Data;
  }
}
export declare module Ports {
  module get {
    export interface Port {
      id: number;
      name: string;
      createdAt: string;
      endsAt: string;
      node: Node;
      ports: PortsData;
      archivedAt?: string;
      city?: string;
      country: string;
      group?: string;
      network: NetworkTypes;
      operator?: string;
      vpn?: VpnType;
      access: Access;
      traffic: Traffic;
      rotation: Rotation;
    }

    export interface Data {
      ports: Port[];
    }

    export interface RootObject {
      status: ResponseStatus;
      total: number;
      count: number;
      currentPage: number;
      data: Data;
    }
  }
  module create {
    export interface Datum {
      id: number;
      name: string;
      createdAt: string;
      endsAt: string;
      node: Node;
      ports: PortsData;
      archivedAt?: string;
      city?: string;
      country: string;
      group?: string;
      network: NetworkTypes;
      operator?: string;
      vpn?: VpnType;
      access: Access;
      traffic: Traffic;
      rotation: Rotation;
    }

    export interface RootObject {
      status: ResponseStatus;
      data: Datum[];
    }
  }
  module remove {
    export interface RootObject {
      status: ResponseStatus;
    }
  }
  module update {
    export interface RootObject {
      id: number;
      name: string;
      country: string;
      city?: string;
      network: NetworkTypes;
      operator?: string;
      node: Node;
      ports: PortsData;
      traffic: Traffic;
      vpn?: string;
    }
  }
  module renew {
    export interface Data {
      id: number;
      name: string;
      createdAt: string;
      endsAt: string;
      node: Node;
      ports: PortsData;
      archivedAt?: string;
      city?: string;
      country: string;
      group?: string;
      network: NetworkTypes;
      operator?: string;
      vpn?: VpnType;
      access: Access;
      traffic: Traffic;
      rotation: Rotation;
    }

    export interface RootObject {
      status: ResponseStatus;
      data: Data;
    }
  }
  module newip {
    module ok {
      export interface Data {
        ip: string;
      }

      export interface RootObject {
        data: Data;
      }
    }
    module fail {
      export interface RootObject {
        status: ResponseStatus;
        message: string;
      }
    }
  }
}

export module Countries {
  export interface Datum {
    name: string;
  }

  export interface RootObject {
    status: ResponseStatus;
    data: Datum[];
  }
}
export module Cities {
  export interface Datum {
    name: string;
  }

  export interface RootObject {
    status: ResponseStatus;
    data: Datum[];
  }
}
export module Operators {
  export interface Datum {
    name: string;
  }

  export interface RootObject {
    status: ResponseStatus;
    data: Datum[];
  }
}
export module Lists {
  export interface Operator {
    name: string;
  }

  export interface City {
    name: string;
    operators: Operator[];
  }

  export interface Datum {
    name: string;
    code: string;
    cities: City[];
  }

  export interface RootObject {
    status: ResponseStatus;
    data: Datum[];
  }
}
export module Calculate {
  export interface Data {
    cost: number;
    currency: string;
  }

  export interface RootObject {
    status: ResponseStatus;
    data: Data;
  }
}
