import {
  NetworkTypes,
  OrderType,
  PortType,
  OrderDirection,
  VpnType,
  RotationType,
  RotationTimeType,
} from "#src/interfaces/enums.interface.js";

export module Request {
  export module Ports {
    export interface get {
      count?: number;
      order?: OrderType;
      orderDirection?: OrderDirection;
      status?: PortType;
    }
    export interface create {
      // Port name
      name?: string;
      // Network type
      network?: NetworkTypes;
      // Country
      country: string;
      // City
      city?: string;
      // Rotation type
      rotation_by?: RotationType;
      // Rotation period type
      rotation_time_type?: RotationTimeType;
      // Rotation time
      rotation_time?: number;
      // Unlimited traffic flag
      is_unlimited: boolean;
      // Traffic volume
      volume: number;
      // Login
      username?: string;
      // Password
      password?: string;
      // IP whitelist
      ip?: string;
    }
    export interface remove {
      id: number;
    }
    export interface update {
      // Port name
      name?: string;
      // Use tunnel mode config
      vpn?: VpnType;
      // Rotation type
      rotation_by?: RotationType;
      // Rotation period type
      rotation_time_type?: RotationTimeType;
      // Rotation time
      rotation_time?: number;
      // Unlimited traffic flag
      is_unlimited?: boolean;
      // Login
      username?: string;
      // Password
      password?: string;
    }
    export interface renew {
      id: number;
      volume: number;
    }
    export interface newip {
      id: number;
    }
  }
  export interface Countries {
    network?: NetworkTypes;
  }
  export interface Cities {
    country: string;
  }
  export interface Operators {
    country: string;
    city: string;
    network: NetworkTypes;
  }
}
