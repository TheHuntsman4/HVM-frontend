const GetUsername = async ({ username }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        "http://136.233.19.201:8000/api/receivers/?username="+username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();        
        console.log(data)
        return data;
      } else {
        throw new Error(`HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export default GetUsername;