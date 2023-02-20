const showEditFeed = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const feedID = urlParams.get('id');
    const comment = urlParams.get('comment');
    window.location.href = `/editFeedBack?id=${feedID}&comment=${comment}`; 
}

const addNewComment = () => {
    if((document.getElementById('userCommentBox').value).trim()!=''){
        setData(document.getElementById('userCommentBox').value);
    }
    else{
        alert("Please Enter the fields");
    }
}

const setData = async(newComment) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const feedID = urlParams.get('id');
        const comment = urlParams.get('comment');
        console.log(feedID);
        let taskType = 'newComment'
        const response = await axios.post('http://localhost:5678/showFeed',{feedID,newComment,taskType});
        const userResponse =(response.data);
        console.log(userResponse);
        window.location.href=`http://localhost:5678/showFeed?id=${feedID}&comment=${Number(comment)+1}`
      } catch (errors) {
        console.error(errors);
      }
}

const showNewReply = (ele) => {
    for(let i = 0 ; i<document.getElementsByClassName('classForReply').length ; i++){
        if(document.getElementsByClassName('classForReply')[i]===ele.parentNode.parentNode.children[2]){
        ele.parentNode.parentNode.children[2].style.display="flex"
        }
        else{
            document.getElementsByClassName('classForReply')[i].style.display="none"
        }
    }
}

const addNewReply = (ele) => {
    let newReply = ele.previousElementSibling.value;
    let userNameReplied = ele.parentNode.parentNode.children[0].children[1].children[1].innerText
    let commentID = ele.parentNode.parentNode.getAttribute('commentID');
    console.log(commentID);
    userNameReplied = userNameReplied.substring(1,userNameReplied.length)
    setReply(newReply,userNameReplied,commentID);
}

const setReply = async(newReply,userNameReplied,commentID) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const feedID = urlParams.get('id');
        let taskType = 'newReply'
        const response = await axios.post('http://localhost:5678/showFeed',{feedID,newReply,userNameReplied,commentID,taskType});
        const userResponse =(response.data);
        console.log(userResponse);
        window.location.reload();
      } catch (errors) {
        console.error(errors);
      }
}

const addNewNestedReply = (ele) => {
    let newReply = ele.previousElementSibling.value;
    let userNameReplied = ele.parentNode.parentNode.children[0].children[1].children[1].innerText
    let commentID = ele.parentNode.parentNode.parentNode.getAttribute('commentID');
    console.log(commentID);
    userNameReplied = userNameReplied.substring(1,userNameReplied.length)
    setReply(newReply,userNameReplied,commentID);
}

const upvotes = (userVote,ele) => {
    console.log(userVote);
    if(userVote===0){
        setUserVote(1);
    }
    else{
        setUserVote(0);
    }
}

const getData = async(ele) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const feedID = urlParams.get('id');
        let taskType = 'getData'
        const response = await axios.post('http://localhost:5678/showFeed',{feedID,taskType});
        const userResponse =(response.data);
        upvotes(userResponse.userVote,ele)
      } catch (errors) {
        console.error(errors);
      }
}

const setUserVote = async(userVote) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const feedID = urlParams.get('id');
        let taskType = 'setUserVote'
        const response = await axios.post('http://localhost:5678/showFeed',{feedID,userVote,taskType});
        const userResponse =(response.data);
        console.log(userResponse);
        window.location.reload();
      } catch (errors) {
        console.error(errors);
      }
}