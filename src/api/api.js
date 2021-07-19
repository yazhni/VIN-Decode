import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://vpic.nhtsa.dot.gov/api/'
})

const vinAPI = {}

vinAPI.getVehicleVariableList = () => {
  return axiosInstance.get(`vehicles/getvehiclevariablelist?format=json`)
                      .then(response => _transformParams(response, listFilter))
                      .catch(reason => reason);
}

vinAPI.getDecodeVin = code => {
  return axiosInstance.get(`vehicles/decodevin/${code}?format=json`)
                      .then(response => _transformParams(response, decodeVinFilter))
                      .catch(reason => reason);
}

vinAPI.getVariableVin = code => {
  return vinAPI.getVehicleVariableList()
               .then(res => res.results.find(el => el.ID === +code))
               .catch(reason => reason);
}

const decodeVinFilter = (el) => (el.Value !== '') && (el.Value !== null)
const listFilter = (el) =>  (el.Value !== '') && (el.Description !== '') 
                             && (el.Value !== null) && (el.Description !== null);

const _transformParams = (response, filter) => {
  return {
    status: response.status,
    message: response.data.Message,
    results: _filterResults(response.data.Results, filter),
  }
}

const _filterResults = (data, filter) => {
  let results = [...data];

  return results.filter(filter);
}

export default vinAPI
