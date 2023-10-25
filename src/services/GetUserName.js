const GetUsername = async ({ username }) => {
    const current_username = username;
  
    try {
      const response = await fetch(
        "http://localhost:8000/api/username",
        {
          method: "POST",
          body: JSON.stringify({"current_username" : current_username}),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error(`HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export default GetUsername;