import axios from './base'

export const getAccessToken = () => {
  if (localStorage.getItem('accessToken')) {
    return localStorage.getItem('accessToken')
  }
  return false
}

const getMe = (token = getAccessToken()) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  return axios.get('/me', config).then((res) => {
    return res.data
  }).catch(error => {
    throw (error)
  })
}
const getAllUser = () => {
  const config = {
    headers: {
      'Authorization': getAccessToken()
    }
  }
  return axios.get('/users', config).then((res) => {
    return res.data
  }).catch(error => {
    throw (error)
  })
}

const getAllSupervisors = () => {
  const config = {
    headers: {
      'Authorization': getAccessToken()
    }
  }
  return axios.get('/users/supervisors', config).then((res) => {
    return res.data
  }).catch(error => {
    throw (error)
  })
}

const updateUser = (payload) => {
  const config = {
    headers: {
      'Authorization': getAccessToken()
    }
  }
  const url = `/users/1`
  return axios.put(url, payload, config).then((res) => {
    return res.data
  }).catch(error => {
    throw (error)
  })
}

const adminUpdateUserByID = (id, payload) => {
  const config = {
    headers: {
      'Authorization': getAccessToken()
    }
  }
  const url = `/users/${id}`
  return axios.put(url, payload, config).then((res) => {
    return res.data
  }).catch(error => {
    throw (error)
  })
}

const getHeaders = () => {
  const token = getAccessToken()
  if (token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token
    }
    return headers
  }
  return null
}

const uploadProfile = (file, name = 'images') => {
  const url = '/me/upload_image'
  if (typeof url !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof url}`)
  }
  // You can add checks to ensure the url is valid, if you wish
  // 'content-type': 'multipart/form-data'
  const formData = new FormData()
  formData.append(name, file)
  const config = {
    headers: {
      'Authorization': getAccessToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.post(url, formData, config)
}

const getOTP = () => {
  const config = {
    headers: {
      'Authorization': getAccessToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.get('/opt', config).then(res => {
    return res.data.opt
  }).catch(err => {
    console.error(err)
    alert('error')
  })
}

export default {
  getMe,
  getAccessToken,
  getHeaders,
  uploadProfile,
  updateUser,
  getAllUser,
  adminUpdateUserByID,
  getAllSupervisors,
  getOTP
}
