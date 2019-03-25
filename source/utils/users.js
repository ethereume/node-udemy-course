const user = [];

const addUser = (id,userName,room) => {
	userName = userName.trim().toLowerCase();
	room = room.trim().toLowerCase();
	if(!userName && !room ){
		const existingUser = user.find((element)=>{
			return element.room === room && element.user === userName
		});
		if(existingUser){
			return {
				error:'User cannot be added, because it exists!'
			}
		}
		let user = {id,room,user:userName};
		user.push(user);
		return {
			user
		}; 


	} else {
		return {
			error:'User and room are required!'
		}
	}
};

const removeUser = (id) => {
	const index = user.findIndex(user=>user.id === id);
	if(index !== -1){
		user = [
				...user.slice(0,index),
				...user.slice(index+1)
			]
	}
};

const getUser = (id) => {
	if(id){
		return user.find(user=>user.id === id);
	} else {
		return {
			error:'Id is required!'
		}
	}
};
getUsersInRomm = (room) => {
	if(room) {
		return user.filter(user=>user.room === room);
	}else {
		return {
			error:'Room is required!'
		}
	}
};

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUserInRomm
}