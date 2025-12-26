function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({name:"coreblume", url: "https://coreblume.com"})
    }, 3000);
  })
}
// fetchData
// .then()
// .catch()

async function getUserData() {
  try {
    console.log("Fetching Data...")
    const data = await fetchData()
    console.log(data)
    console.log("Data Fetched Successfully")
  } catch (error) {
    console.log("Error Fetching Data");
    console.log(error);    
  }
}
getUserData()
// console.log("hello")