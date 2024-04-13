export interface IGetAllDataSensorRes {
  id: number;
  temperature: number;
  humidity: number;
  light: number;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IGetAllDataSensorReq {
  page: number;
  pageSize: number;
  temperature?: number;
  humidity?: number;
  light?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  type?: IType;
  search?: any;
}

export interface IType {
  temperature?: number;
  humidity?: number;
  light?: number;
  createdDate?: string;
  lastModifiedDate?: string;
}
