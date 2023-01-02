import fs from "node:fs"
import metadata from "~/server/data.json";
export default defineEventHandler(async (event) => {

    const file = "server/data.json"

    let rawdata = fs.readFileSync(file);
    let response = JSON.parse(rawdata);


    

    const body = await readBody(event)

    

    const checkDataExists = response.data.find(item => item.name === body.name)


    if(checkDataExists != undefined) {
        return "Already exists"
    }
 
    let newData = {
        data: [
            ...response.data,
            body
        ]
    }

    let parsedData = JSON.stringify(newData, null, 2)
    fs.writeFileSync(file, parsedData);


    return {newData}
})
