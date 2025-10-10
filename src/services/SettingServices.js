import requests from "./httpService";

const SettingServices = {
  // global setting all function
  addGlobalSetting: async (body) => {
    return requests.post("/setting/global/add", body);
  },

  getGlobalSetting: async () => {
    return requests.get("/setting/global/all");
  },

  updateGlobalSetting: async (body) => {
    return requests.put(`/setting/global/update`, body);
  },

  // store setting all function
  addStoreSetting: async (body) => {
    return requests.post("/setting/store-setting/add", body);
  },

  getStoreSetting: async () => {
    return requests.get("/setting/store-setting/all");
  },

  updateStoreSetting: async (body) => {
    return requests.put(`/setting/store-setting/update`, body);
  },

  // store customization setting all function
  addStoreCustomizationSetting: async (body) => {
    return requests.post("/setting/store/customization/add", body);
  },

  getStoreCustomizationSetting: async () => {
    return requests.get("/setting/store/customization/all");
  },

  updateStoreCustomizationSetting: async (body) => {
    return requests.put(`/setting/store/customization/update`, body);
  },

  // stock management setting all function
  addStockManagementSetting: async (body) => {
    return requests.post("/setting/stock-management/add", body);
  },

  getStockManagementSetting: async () => {
    return requests.get("/setting/stock-management/all");
  },

  updateStockManagementSetting: async (body) => {
    return requests.put(`/setting/stock-management/update`, body);
  },
};

export default SettingServices;
