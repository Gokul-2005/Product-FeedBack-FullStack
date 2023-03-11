const commentCountArr = [];
const categorySortArr = [];


function openSortOption(){
    if(document.getElementById("sort-Div").style.display=="block"){
        document.getElementById("sort-Div").style.display="none";
    }
    else{
        document.getElementById("sort-Div").style.display="block";
    }
}

function sortFeedBack(ele) {
    for (let i = 0; i < document.getElementsByClassName('sortOption').length; i++) {
        if(ele ===document.getElementsByClassName('sortOption')[i]){
            document.getElementsByClassName('sortOption')[i].querySelector('img').src="Assets/icon-check.svg";
            sortButton.innerText = document.getElementsByClassName('sortOption')[i].innerText
            document.getElementById("sort-Div").style.display="none";
            console.log(ele.innerText);
            arrange(ele.innerText)
        }        
        else{
            document.getElementsByClassName('sortOption')[i].querySelector('img').src="";
        }
    }
}



const getData = async() => {
    try {
        const response = await axios.post('http://localhost:5678/index');
        const userResponse =(response.data);
        userResponse.forEach(request => {
        let total = 0;
        const propertyValues=Object.values(JSON.parse(request.comments)); 
        var enc = new TextDecoder("utf-8");
        var array = new Uint8Array(propertyValues);
        let finalValue = enc.decode(array); 
        total += JSON.parse(finalValue).length;
        (JSON.parse(finalValue)).forEach(comment => {
        if (comment.replies) {
          total += comment.replies.length;
        }
        });
        commentCountArr.push(total);
        });
        let planned = 0;
        let inProgress = 0;
        let live = 0 ;
        let suggestion = 0 ;
        userResponse.forEach(request => {
            if(request.status==='planned'){
                planned++;
            }
            if(request.status==='in-progress'){
                inProgress++;
            }
            if(request.status==='live'){
                live++;
            }
            if(request.status==='suggestion'){
                suggestion++;
            }
        })
        document.getElementById('suggestionCount').innerText=`${suggestion} suggestions`
        document.getElementsByClassName('roadMapTypeCount')[0].innerText = planned ;
        document.getElementsByClassName('roadMapTypeCount')[1].innerText = inProgress ;
        document.getElementsByClassName('roadMapTypeCount')[2].innerText = live ;
        for (let i = 0; i < document.getElementsByClassName('MainFeedBackClass').length; i++) {
            document.getElementsByClassName('MainFeedBackClass')[i].setAttribute('Comments',commentCountArr[i])
            document.getElementsByClassName('MainFeedBackClass')[i].children[2].querySelector('div').innerText=commentCountArr[i]
        }
      } catch (errors) {
        console.error(errors);
      }
}

getData();

function arrange(sortType) {
    if(sortType.includes('Recently')){
        const parentElement = document.querySelector('#mainBoxBody');
     const childElements = parentElement.children;
     const sortedChildren = [...childElements].sort((b, a) => {
       const attributeA = Number(a.getAttribute("feedID"));
       const attributeB = Number(b.getAttribute("feedID"));
       if (attributeA < attributeB) {
         return -1;
       }
       if (attributeA > attributeB) {
         return 1;
       }
       return 0;
     });
     parentElement.innerHTML = '';
     sortedChildren.forEach(child => {
       parentElement.appendChild(child);
     }); 
    }
    else{
    if(sortType.includes('Most')){
     const parentElement = document.querySelector('#mainBoxBody');
     const childElements = parentElement.children;
     const sortedChildren = [...childElements].sort((b, a) => {
       const attributeA = Number(a.getAttribute(sortType.split(" ")[1]));
       const attributeB = Number(b.getAttribute(sortType.split(" ")[1]));
       if (attributeA < attributeB) {
         return -1;
       }
       if (attributeA > attributeB) {
         return 1;
       }
       return 0;
     });
     parentElement.innerHTML = '';
     sortedChildren.forEach(child => {
       parentElement.appendChild(child);
     });
    }
    else{
        const parentElement = document.querySelector('#mainBoxBody');
        const childElements = parentElement.children;
        const sortedChildren = [...childElements].sort((a, b) => {
          const attributeA = Number(a.getAttribute(sortType.split(" ")[1]));
          const attributeB = Number(b.getAttribute(sortType.split(" ")[1]));
          if (attributeA < attributeB) {
            return -1;
          }
          if (attributeA > attributeB) {
            return 1;
          }
          return 0;
        });
        parentElement.innerHTML = '';
        sortedChildren.forEach(child => {
          parentElement.appendChild(child);
        });
    }
    }
}


const sortByCategory = (ele) => {
    if(!(categorySortArr.includes((ele.innerText).toLowerCase()))){
        categorySortArr.push((ele.innerText).toLowerCase());
        ele.style.backgroundColor = '#4661E6';
        ele.style.color = '#FFFFFF';
    }
    else{
        categorySortArr.splice(categorySortArr.indexOf((ele.innerText).toLowerCase()),1);
        ele.style.backgroundColor = '';
        ele.style.color = '';
    }
    for (let i = 0; i < document.getElementsByClassName('MainFeedBackClass').length; i++) {
        if(categorySortArr.includes('all') || categorySortArr.length===0){
            document.getElementsByClassName('MainFeedBackClass')[i].style.display='flex';
        }
        else{
        if( categorySortArr.includes((document.getElementsByClassName('MainFeedBackClass')[i].getAttribute('category')).toLowerCase())){
            document.getElementsByClassName('MainFeedBackClass')[i].style.display='flex';
        }   
        else{
            document.getElementsByClassName('MainFeedBackClass')[i].style.display='none';
        }    
        } 
    }
}

const showHover = (ele) => {
    ele.children[1].children[0].style.color = '#4661E6'
}

const closeHover = (ele) => {
    ele.children[1].children[0].style.color = '#3A4374'
}

const showBrief = (ele) => {
    const feedBackID = ele.getAttribute('feedID');
    const comment = ele.getAttribute('comments');
    window.location.href = `http://localhost:5678/showFeed?id=${feedBackID}&comment=${comment}`;
}

const showAddPage = () => {
    window.location.href = "http://localhost:5678/addNewFeedBack"
}