export interface IGetAllHistoryRes {
  id: number;
  device: string;
  action: string;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IGetAllHistoryReq {
  page: number;
  pageSize: number;
  device: string | null;
  action: string | null;
  createdDate: string | null;
}
