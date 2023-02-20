function categoryFeedBack(ele) {
    for (let i = 0; i < document.getElementsByClassName('categoryOption').length; i++) {
        if(ele ===document.getElementsByClassName('categoryOption')[i]){
            document.getElementsByClassName('categoryOption')[i].querySelector('img').src="Assets/icon-check.svg";
            sortButton.innerText = document.getElementsByClassName('categoryOption')[i].innerText
            document.getElementById("category-Div").style.display="none";
        }        
        else{
            document.getElementsByClassName('categoryOption')[i].querySelector('img').src="";
        }
    }
}
function openSortOption(){
    if(document.getElementById("category-Div").style.display=="block"){
        document.getElementById("category-Div").style.display="none";
    }
    else{
        document.getElementById("category-Div").style.display="block";
    }
}

function statusFeedBack(ele) {
    for (let i = 0; i < document.getElementsByClassName('statusOption').length; i++) {
        if(ele ===document.getElementsByClassName('statusOption')[i]){
            document.getElementsByClassName('statusOption')[i].querySelector('img').src="Assets/icon-check.svg";
            statusButton.innerText = document.getElementsByClassName('statusOption')[i].innerText
            document.getElementById("status-Div").style.display="none";
        }        
        else{
            document.getElementsByClassName('statusOption')[i].querySelector('img').src="";
        }
    }
}
function openStatusOption(){
    if(document.getElementById("status-Div").style.display=="block"){
        document.getElementById("status-Div").style.display="none";
    }
    else{
        document.getElementById("status-Div").style.display="block";
    }
}


const getData = async() => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const feedID = urlParams.get('id');
        let taskType = 'getData'
        const response = await axios.post('http://localhost:5678/editFeedBack',{feedID,taskType});
        const userResponse =(response.data);
        console.log(userResponse);
        document.getElementById("createTitle").innerText=`Editing ‘${userResponse.title}’`
        document.getElementById("title").value=userResponse.title
        document.getElementById("sortButton").innerText=userResponse.catogery
        document.getElementById("statusButton").innerText=userResponse.status
        document.getElementById("description").innerText=userResponse.description

      } catch (errors) {
        console.error(errors);
      }
}

getData();

const updateFeedback = () => {
    let feedTitle = document.getElementById("title").value;
    let feedDesc = document.getElementById("description").value;
    let feedType = document.getElementById('sortButton').innerText;
    let feedStatus = document.getElementById('statusButton').innerText;
    if(feedTitle.trim()!='' || feedDesc.trim()!=''){
        setData(feedTitle,feedDesc,feedType,feedStatus);
    }
    else{
        alert("Please Enter the fields");
    }
}

const setData = async(feedTitle,feedDesc,feedType,feedStatus) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const feedID = urlParams.get('id');
        let taskType = 'setData'
        const response = await axios.post('http://localhost:5678/editFeedBack',{feedID,feedTitle,feedDesc,feedType,feedStatus,taskType});
        const userResponse =(response.data);
        console.log(userResponse);
        window.location.href=`http://localhost:5678/showFeed?id=${feedID}`
      } catch (errors) {
        console.error(errors);
      }
}


const cancelNewFeed = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const feedID = urlParams.get('id');
    const comment = urlParams.get('comment');
    window.location.href = `/showFeed?id=${feedID}&comment=${comment}`
}

const deleteFeedBack = () => {
    deleteData();
}

const deleteData = async() => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const feedID = urlParams.get('id');
        let taskType = 'deleteData'
        const response = await axios.post('http://localhost:5678/editFeedBack',{feedID,taskType});
        const userResponse =(response.data);
        console.log(userResponse);
        window.location.href=`http://localhost:5678/index`
      } catch (errors) {
        console.error(errors);
      }
}