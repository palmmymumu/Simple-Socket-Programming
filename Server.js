var net = require('net'); // ดึง Module net มาใช้

var database = {}; // สร้าง Object เพื่อเก็บข้อมูลทั้งหมด

net.createServer((socket) => { // สร้างเซิฟเวอร์ใหม่ โดยเมื่อมีการเชื่อมต่อจะให้มาทำงาน Anonymous function อันนี้ โดยแทน socket ของ Client ด้วยตัวแปร socket

	var name = null; // สร้างตัวแปล name เพื่อเก็บค่าเริ่มต้น

	console.log('User connected');

	socket.on('data', (data) => {
		if (name == null) { // ถ้ายังไม่มี name
			name = data.toString(); // แสดงว่า name คือข้อมูลที่ส่งมา (แสดงว่าคือครั้งแรก)
			if (!database[name]) // ถ้าใน Object database ไม่มี Key ชื่อนี้
				database[name] = 0; // กำหนดเริ่มต้นให้เป็น 0
			socket.write('OK'); // ตอบกลับ OK
		} else { // ถ้ามี name แล้ว (หลังจากครั้งแรก)
			database[name] += parseInt(data.toString()); // แปลงข้อความที่ได้รับเป็นตัวเลข และเพิ่มเข้าไปใน Object database
			socket.write('Total = ' + database[name]);
			// ส่งข้อมูลไป
			console.log(database);
			socket.destroy(); // ปิดการเชื่อมต่อ
		}
		console.log('Received data', data.toString());
	})

	socket.on('close', () => { // console.log เมื่อมีการปิดการเชื่อมต่อ
		console.log('User disconnected!');
	})
}).listen(1333); // รันเซิฟเวอร์บนพอร์ต 3333