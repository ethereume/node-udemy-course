const express = require("express");
const http = require('http');
const path = require("path");
const socket = require("socket.io");
const Filter = require('bad-words');


const filter = new Filter();
const app = express();
const post = process.env.PORT;
const public = path.join(__dirname,"/source/pages");

const server = http.createServer(app);
const io = socket(server); 


app.use(express.json());
app.use(express.static(public));


const timeStamp = (text) => {
	return {
		text,
		createAt:new Date().getTime()
	}
}

let count = 0;
io.on("connection",(socket)=>{

	socket.on("message",(dane)=>{
		if(filter.isProfane(dane)){
			
		} else {
			io.emit("forAll",timeStamp(dane));
		}
	});
	socket.on("sendLocation",(dane,callback)=>{
			if(dane) {
				callback(`https://google.com/maps?q=${dane.latitude},${dane.longitude}`);
				io.emit("sheringLocation",{url:`https://google.com/maps?q=${dane.latitude},${dane.longitude}`,time:new Date().getTime()});
			} else {
				callback('Jakis nieokreślony bląd');
			}
	});
	socket.on("disconnect",()=>{
		io.emit("forAll",timeStamp('User has left'));
	});
	socket.on("join",({username,room})=>{
		socket.join(room);
		socket.emit('welkome',timeStamp('Welkome'));
		socket.broadcast.to(room).emit('welkome',timeStamp(`Dołaczył uzytkownik ${username}`));

		//socket.emit -> emituje zdarzenie tylko to podlączonego klienta
		//io.emit -> emituje zdarzenia do wszsytkich 
		//socket.broadcast.emit -> emituje zdarzenia do wszsytkich oprócz do siebie samego

		//io.to.emit -> emit events to enybody to the specyfic room	
		//socket.broadcast.to.emit -> sending events to the client exepts yourself and to the specyfic room
	});
});




server.listen(post,()=>{
	console.log(`Server listene at port ${post}`);
})