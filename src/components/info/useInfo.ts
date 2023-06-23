import axios from 'axios';
import { infoUrl } from '../../axiosInstance/constants';
import { useQuery } from 'react-query';
import { queryKeys } from '../../react-query/constants';

async function getInfo() {
  const apiUrl = infoUrl;
  const serviceKey = process.env.REACT_APP_FACILITY_API;
  const numOfRows = 4010;
  const params = { serviceKey, numOfRows };

  const response = await axios.get(apiUrl, { params });
  const data = response.data.response.body.items.item;
  return data;
}
const useInfo = () => {
  const { data, isLoading } = useQuery(queryKeys.info, getInfo);
  return { data, isLoading };
};

export default useInfo;
