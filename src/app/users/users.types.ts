
export interface IUser {
  gender: string;
  name: {
    title: string,
    first: string,
    last: string;
  };
}

export interface ISearchUser {
  info: {
    page: number
    results: number
    seed: string
  };
  results: IUser[];
}

export interface IPagination {
  currentPage: number;
  itemPerPage: number;
  itemsPerPageSizes: number[];
}
