// import { spawn } from "child_process";

// const result = spawn("python", ["test.py"]) // , {stdio: 'inherit'});
// result.stdout.on('data', (data) => {
// 	console.log(data.toString('utf-8'));
//  });

// import { spawn } from "child_process";

// const result = spawn("python", ["test.py"])
// result.stdout.on("data", (data) => {
//     console.log(data.toString())
// })

import { spawn } from "child_process";

const result = spawn("python", ["test.py"])
result.stdout.on("data", (data) => {
    console.log(data.toString('utf8'))
})