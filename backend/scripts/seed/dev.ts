
import db, { genid } from "../../src/modules/db";

const run = async () =>{
    const id = await genid();
    await db.newSubmission.createMany({
    data:[
        {
            id : id,
            data : {
                name : "John Doe",
                email : "john.doe@example.com",
            },
            submittedAt : new Date(),

        },
    ]
    });
};


run().then(()=>{
          console.log("Seeding done")
         }).catch((error )=>{
            console.log(error);
         })
         ;
// if( typeof require !== 'undefined' && require.main === module){
//     run().then(()=>{
//         console.log("Seeding done")
//         process.exit(0);  
//     })
// }


