import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: '/data/catalog',
    byId: '/data/catalog/',
    myId: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/'
}

export function getAllFurniture() {
    return api.get(endpoints.all);
}

export function getAllFurnitureById(id) {
    return api.get(endpoints.byId + id);
}

export function getMyFurnitureById(userId) {
    return api.get(endpoints.myId(userId));
}

export function createFurniture(data) {
    return api.post(endpoints.create, data);
}

export function editFurniture(id, data) {
    return api.put(endpoints.edit + id, data);
}

export function deleteFurniture(id) {
    return api.del(endpoints.delete + id);
}