import Cookies from 'js-cookie'

const Token = 'Admin-Token'
const TokenKey = 'Admin-TokenKey'
const userKey = 'userInfo'
const visitedViewsKey = 'visitedViews'
const cachedViewsKey = 'cachedViews'
const themeKey = 'theme'


export function getToken () {
  return Cookies.get(Token)
}

export function setToken (token) {
  return Cookies.set(Token, token)
}

export function removeToken () {
  return Cookies.remove(Token)
}

export function getTokenKey () {
  return Cookies.get(TokenKey)
}

export function setTokenKey (tokenkey) {
  return Cookies.set(TokenKey, tokenkey)
}

export function removeTokenKey () {
  return Cookies.remove(TokenKey)
}

export function setUserInfo (userInfo) {
  return sessionStorage.setItem(userKey, JSON.stringify(userInfo))
}
export function getUserInfo () {
  return JSON.parse(sessionStorage.getItem(userKey))
}
export function removeUserInfo () {
  return sessionStorage.removeItem(userKey)
}

export function setVisitedViews (visitedViews) {
  return sessionStorage.setItem(visitedViewsKey, JSON.stringify(visitedViews))
}
export function getVisitedViews () {
  return JSON.parse(sessionStorage.getItem(visitedViewsKey))
}
export function removeVisitedViews () {
  return sessionStorage.removeItem(visitedViewsKey)
}

export function setCachedViews (cachedViews) {
  return sessionStorage.setItem(cachedViewsKey, JSON.stringify(cachedViews))
}
export function getCachedViews () {
  return JSON.parse(sessionStorage.getItem(cachedViewsKey))
}
export function removeCachedViews () {
  return sessionStorage.removeItem(cachedViewsKey)
}

export function setTheme (theme) {
  return localStorage.setItem(themeKey, theme)
}
export function getTheme () {
  return localStorage.getItem(themeKey)
}
