import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers";

const baseUrl = `https://aligner-server.herokuapp.com/api`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
  getDatasets,
  getDatasetByName,
  createNewDataset,
  getAllSentencePairs,
  getOneSentencePair,
  createNewSentencePair,
  importSentencePairsFromFile,
  acquireSentencePair,
  autoAlignOneSentencePair,
  autoAlignAllSentencePairs,
  updateAlignOneSentencePair,
};

function login(username, password) {
  return fetchWrapper
    .post(`${baseUrl}/accounts/login`, {
      account: {
        username: username,
        password: password,
      },
    })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/login");
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
      // update local storage
      const user = { ...userSubject.value, ...params };
      localStorage.setItem("user", JSON.stringify(user));

      // publish updated user to subscribers
      userSubject.next(user);
    }
    return x;
  });
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

// datasets

function getDatasets() {
  return fetchWrapper.get(`${baseUrl}/datasets`);
}

function getDatasetByName(dataset_slug) {
  return fetchWrapper.get(`${baseUrl}/datasets/${dataset_slug}`);
}

function createNewDataset(data) {
  return fetchWrapper.post(`${baseUrl}/datasets`, data);
}

// sentence_pairs

function getAllSentencePairs(dataset_slug, page=1, size=10) {
  return fetchWrapper.get(`${baseUrl}/datasets/${dataset_slug}/sentence_pairs?page=${page}&size=${size}`);
}

function getOneSentencePair(dataset_slug, sentence_pairs_id) {
  return fetchWrapper.get(
    `${baseUrl}/datasets/${dataset_slug}/sentence_pairs/${sentence_pairs_id}`
  );
}

function createNewSentencePair(data, dataset_slug) {
  return fetchWrapper.post(`${baseUrl}/datasets/${dataset_slug}/sentence_pairs`, data);
}

function importSentencePairsFromFile(dataset_slug, form_data) {
  return fetchWrapper.post(`${baseUrl}/datasets/${dataset_slug}/import`, form_data, { contentType: "multipart/form-data" });
}

// alignment_actions
function acquireSentencePair(dataset_slug, sentence_pairs_id) {
  return fetchWrapper.get(
    `${baseUrl}/datasets/${dataset_slug}/sentence_pairs/${sentence_pairs_id}/acquire`
  );
}

function autoAlignOneSentencePair(dataset_slug, sentence_pairs_id) {
  return fetchWrapper.get(
    `${baseUrl}/datasets/${dataset_slug}/sentence_pairs/${sentence_pairs_id}/auto_align`
  );
}

function autoAlignAllSentencePairs(dataset_slug) {
  return fetchWrapper.get(`${baseUrl}/datasets/${dataset_slug}/auto_align`);
}

function updateAlignOneSentencePair(dataset_slug, sentence_pairs_id,alignments) {
  return fetchWrapper.put(
    `${baseUrl}/datasets/${dataset_slug}/sentence_pairs/${sentence_pairs_id}/alignments`,alignments
  );
}
