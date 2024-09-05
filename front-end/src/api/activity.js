import axios from "axios";

export async function Show(element, id, token) {


    const allPosts = [];
    const res = await axios.get(`http://localhost:2000/${element}/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    ) 
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

