import axios from "axios";


export async function Index(element) {

    const allPosts = [];
    const res = await axios.get(`http://localhost:2000/${element}s`) 
    if (res.data.length !== 0) {
        for (const key in res.data){
            allPosts.push({...res.data[key]})
        }
        return allPosts

    }
    else {
        return undefined
    }
}

