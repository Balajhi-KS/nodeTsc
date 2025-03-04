interface CustomRequest extends Request {
  filteredData?: {
    body: any;
    params: any;
    query: any;
  };
}
export {CustomRequest}