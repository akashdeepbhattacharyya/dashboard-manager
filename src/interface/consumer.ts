export interface Consumer {
  id: string;
  name: String;
  email: String;
  phone: String;
  address: String;
  mru: String;
  poleNumber: String;
  consumption: String;
  di: String;
  subDivision: String;
  multiplyingFactor: String;
  explorer: Measurement[];
  transactions?: any[];
}

interface VoltageEntry {
  time: string;
  voltage: number;
}

export interface VoltageData {
  [timeFrame: string]: VoltageEntry[];
}
export interface Measurement {
  id: number;
  name: string;
  logical_name: string;
  voltageData: VoltageData;
}
