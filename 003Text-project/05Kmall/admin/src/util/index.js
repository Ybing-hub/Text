export const saveUsername = (username)=>{
	window.localStorage.setItem('username',username)
}
export const getUsername = ()=>{
	return window.localStorage.getItem('username')
}
export const romoveUsername = ()=>{
	return window.localStorage.removeItem('username')
}