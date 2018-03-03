var net = require('net');
var client = new net.Socket();

// How to use
// node Client.js Name Number
// ex: node Client.js Palm 10

client.connect(3333, '127.0.0.1', () => { // เชื่อมต่อไป 127.0.0.1:3333
	console.log('Connected to server'); // เชื่อมต่อแล้วแสดง console.log
	client.write(process.argv[2]); // เอาข้อมูลใน argument 2 ส่งไปยัง Server (argument 2 คือชื่อ)
})

client.on('data', (data) => { // เมื่อมีข้อมูลส่งมา
	if (data.toString() == 'OK') { // ถ้าข้อมูลคือ OK
		client.write(process.argv[3]); // ส่ง argument 3 ส่งไปยัง Server (argument 3 คือตัวเลข)
	}
	console.log('Received data', data.toString());
})

client.on('close', (data) => { // ถ้าโดนปิดการเชื่อมต่อ
	client.destroy(); // สั่งปิดการเชื่อมต่อและ console.log
	console.log('Disconnected!');
})

