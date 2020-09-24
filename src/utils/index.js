export const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)

export const validateEmail = email => {
  const regex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/
  return regex.test(`${email}`.toLowerCase())
}

export const validatePass = pass => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return regex.test(pass)
}
