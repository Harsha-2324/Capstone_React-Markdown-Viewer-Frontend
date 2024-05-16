

export function CheckAuth(data){                            
    if (data.status === 401) {
      console.log("Unauthorized");
      throw Error("Unauthorized")
    } else {
      return data.json();
    }
  }