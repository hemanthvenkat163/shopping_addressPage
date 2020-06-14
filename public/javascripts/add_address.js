const input = document.querySelector(".pincode");
const city = document.querySelector(".city");
const state = document.querySelector(".state");

const fetchData = async (pincode)=>{
  const response = await axios.get("https://api.postalpincode.in/pincode/"+pincode);
  // console.log(response.data[0].PostOffice[0].District);
  // console.log(response.data[0].PostOffice[0].State);
  if(response.data[0].PostOffice === null){
    return null
  }else{
    return response.data
  }

}

let timeoutId;
const onInput = function(event){
  if(timeoutId){
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(async ()=>{
    var data = await fetchData(event.target.value);
    console.log(data);
    if(data){
      city.value = data[0].PostOffice[0].District;
      state.value = data[0].PostOffice[0].State;
    }
  },500);
}

input.addEventListener("input",function(event){
  onInput(event);
})
