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

const cancelNewFeed = () => {
    window.location.href = `/index`
}

const addNewFeedBackButton = () => {
    let feedTitle = document.getElementById("title").value;
    let feedDesc = document.getElementById("description").value;
    let feedType = document.getElementById('sortButton').innerText;
    if(feedTitle.trim()!='' || feedDesc.trim()!=''){
        getData(feedTitle,feedDesc,feedType);
    }
    else{
        alert("Please Enter the fields");
    }
}

const getData = async(feedTitle,feedDesc,feedType) => {
    try {
        const response = await axios.post('http://localhost:5678/addNewFeedBack',{feedTitle,feedDesc,feedType});
        const userResponse =(response.data);
        console.log(userResponse);
        window.location.href = '/index';

      } catch (errors) {
        console.error(errors);
      }
}

