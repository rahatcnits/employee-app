const BASE_URL = "http://localhost:5050";

export const getAllEmployees = async (search = "", page = 1, limit = 5) => {
  const url = `${BASE_URL}/api/employee?search=${search}&page=${page}&limit=${limit}`;

  try {
    const options = {
      method: "GET",
      "Content-Type": "application/json",
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const createEmployee = async (empObj) => {
  const url = `${BASE_URL}/api/employee`;

  try {
    const formData = new FormData();
    for (let key in empObj) {
      formData.append(key, empObj[key]);
    }
    const options = {
      method: "POST",
      "Content-Type": "application/json",
      body: formData,
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const updateEmployeeById = async (empObj, id) => {
  const url = `${BASE_URL}/api/employee/${id}`;

  try {
    const formData = new FormData();
    for (let key in empObj) {
      formData.append(key, empObj[key]);
    }
    const options = {
      method: "PUT",
      "Content-Type": "application/json",
      body: formData,
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employee/${id}`;
  try {
    const options = {
      method: "DELETE",
      "Content-Type": "application/json",
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employee/${id}`;
  try {
    const options = {
      method: "GET",
      "Content-Type": "application/json",
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};
