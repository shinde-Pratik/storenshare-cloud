const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');
connectDB();

async function deleteData(){
    //fetch 24hr old files
    const pastDate = new Date(Date.now()- 24*60*60*1000); // convert into 24hr
    const files = await File.find({createdAt: {$lt: pastDate}});
    if(files.length){
        for(const file of files){
           try{
                fs.unlinkSync(file.path); //delete file
                await file.remove();
                console.log(`Successfully Deleted ${file.filename}`);
           }catch(err){
                console.log(`Error During deleteing file ${err}`);
           }
        }
        console.log('job Done');
    }
}

deleteData().then(process.exit);