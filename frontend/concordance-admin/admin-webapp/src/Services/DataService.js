import axios from "axios";
class DataServie {
  static baseURL = "https://aligner-server.herokuapp.com/api/";
  static userURL = "http://localhost:3000/";
  fetchLanguageData_pagination(number, language) {
    return axios({
      method: "GET",
      url: DataServie.baseURL + `/${language}/?page=${number}`,
    });
  }
}

export default DataServie;
