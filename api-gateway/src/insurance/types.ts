export type AddContractParams = {
  form: string;
  details: string;
  client: string;
};

export type ContractResponse = {
  id: number;
  form: string;
  details: string;
  client: string;
};

export type AddContractResponse = ContractResponse;

export type GetAllContractsResponse = ContractResponse[];

export type DeleteContractParams = {
  id: number;
};

export type AddRequestParams = {
  amount: number;
  reason: string;
  details: string;
  client: string;
  insContractId: number;
  userId: number;
};

export type RequestResponse = {
  id: number;
  amount: number;
  reason: string;
  details: string;
  client: string;
};

export type AddRequestResponse = RequestResponse;

export type GetAllRequestsResponse = RequestResponse[];

export type DeleteRequestParams = {
  id: number;
};
