export function lazyLoading (name) {
  return () => import(/* webpackChunkName: "page-[request]" */ `../views/${name}`)
}
