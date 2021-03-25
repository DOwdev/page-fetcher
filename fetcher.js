const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);

const saveBody = (args) => {
    request(args[0], (error, response, body) => {
        if(error){
            console.log('Failed to download reosurce: ', error);
            return;
        }

 if(fs.existsSync(args[1])){
    rl.question('File already exists would you like to overwrite the file?\n Y or N?\n', (answer)=>{
        if(answer === 'y' || answer === 'Y'){
            fs.writeFile(`${args[1]}`, `${body}`, (err)=>{
                if(err) { 
                    console.log("there was an error. Cannot find path", err);
                    rl.close();
                } else{
                console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`);
                rl.close();
                }
            })
        }else{
            rl.close();
        }
    })} else {
        fs.writeFile(`${args[1]}`, `${body}` , (err)=>{
            if(err) { 
                console.log("there was an error");
                rl.close();
            }
            console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`);
            rl.close();
        })
    } 
    })
}
    
if(args.length > 2){
    console.log('Invalid entry');
} else{
    saveBody(args);
}
