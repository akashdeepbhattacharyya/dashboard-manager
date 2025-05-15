export interface Consumer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  mru: string;
  poleNumber: string;
  consumption: string;
  di: string;
  subDivision: string;
  multiplyingFactor: string;
  explorer: Measurement[];
  transactions?: transaction[];
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

export interface transaction 
  { month: string, billPayments: number, recharges: number, complaints: number }
