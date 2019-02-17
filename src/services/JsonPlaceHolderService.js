import axios from "axios";
import querystring from "querystring";

class JsonPlaceHolderService{

static getPosts(){	
axios.post('http://127.0.0.1:5000/get_specific_users', querystring.stringify({column_name: "UserId",
																			    search_value: 1
																			  }))
		.then((response) => {
        return response.json()
			
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });

}	
	
}	
export default JsonPlaceHolderService