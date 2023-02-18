const getData = async() => {
    try {
        const response = await axios.post('http://localhost:5678/roadMap');
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
        });
        let planned = 0;
        let inProgress = 0;
        let live = 0 ;
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
        })

        document.getElementsByClassName('classForCategoryHead')[0].innerText = `Planned (${planned})` ;
        document.getElementsByClassName('classForCategoryHead')[1].innerText = `In-Progress (${inProgress})` ;
        document.getElementsByClassName('classForCategoryHead')[2].innerText = `Live (${live})` ;
        for(let i=0 ; i<document.getElementsByClassName('classForInsertComment').length ; i++){
            let title = document.getElementsByClassName('classForInsertComment')[i].children[1].innerText
            userResponse.forEach(request => {
                if(request.title===title){
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
                        document.getElementsByClassName('classForInsertComment')[i].children[4].querySelectorAll('div')[0].querySelectorAll('div')[0].innerText=total
                }
            })
    
        }
      } catch (errors) {
        console.error(errors);
      }
}

getData();

const showHover = (ele) => {
    ele.children[1].style.color = '#4661E6'
}

const closeHover = (ele) => {
    ele.children[1].style.color = '#3A4374'
}

const showBrief = (ele) => {
    console.log(ele);
    const feedBackID = ele.getAttribute('feedID');
    const comment = ele.children[4].querySelectorAll('div')[0].querySelectorAll('div')[0].innerText
    window.location.href = `http://localhost:5678/showFeed?id=${feedBackID}&comment=${comment}`;
}