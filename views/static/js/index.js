var userDetails = JSON.parse(sessionStorage.getItem('user'));


let url = "http://18.237.47.157:4000";
let jwt_token = sessionStorage.getItem('token'); //getCookie('token')
let options = { 
    headers : { 
        authorization : `${jwt_token}` 
    } 
};

// function getCookies() {
//     return document.cookie.split("; ").reduce(function(cookies, token){
//         // split key=value into array
//         var pair = token.split("=");
//         // assign value (1) as object's key with (0)
//         cookies[pair[0]] = decodeURIComponent(pair[1]);
//         // pass through the key-value store
//         return cookies;
//     }, { /* start with empty "cookies" object */ });
// }

// function getCookie(name) {
//     return getCookies()[name];
// }

let updateData = async function(e){
    e.preventDefault();
    try {
        let selectValue = e.target.value;
        let comment = "";
        if(selectValue == "no"){
            let result = await swal.fire({
                title: "Comment!",
                text: "Your Comment On It:",
                input: 'text',
                showCancelButton: true        
            })
            if (result.value) {
                comment = result.value;
            }else{
                e.target.value = selectValue == "yes" ? "no" : "yes";
                return;
            }
        }
        let obj = {
            id : e.target.parentNode.parentNode.querySelector(".article-id").innerText,
            status : selectValue,
            comment : comment
        }
        let response = await axios.post(`${url}/data/update-data`, obj, options);
        if(response.data.success == false){
            swal.fire("Error in Response!")
            return;
        }
        e.target.parentNode.parentNode.querySelector(".comments").innerText = comment;
    } catch (error) {
        console.log(error);
    }
}

let getClick = async (e) => {
    try {

        if(e.target.className == "client"){
            let id = e.target.id;
            let response = await axios.post(`${url}/data/get-data`,{id : id}, options);
            if(response.data.success == false){
                swal.fire("Error in Response!")
                return;
            }

            document.querySelector("#username").innerText = `Welcome! ${userDetails.name}`;
            let data = response.data.data;
            document.querySelector("#table").innerHTML = `<div class="table-header"><div class="article-id">Article ID</div><div class="link">Try Here</div><div class="status">Status</div><div class="comments">Comment</div></div>`;
            let text = "";
            for(let i=0;i<data.length;i++){
                let comment = data[i].comment == null ? "" : data[i].comment;
                text += `<div class="table-row"><div class="article-id">${data[i].id}</div><div class="link"><a href="${data[i].link}">${data[i].link}</a></div><div class="status"><select name="status">${data[i].status == true ? `<option value="yes" selected>Yes</option><option value="no">No</option></select>` : `<option value="yes">Yes</option><option value="no" selected>No</option></select>`}</div><div class="comments">${comment}</div></div>`
            }
            document.querySelector("#table").innerHTML += text;
            let selectItems = document.querySelectorAll("select");
            for(let i=0;i<selectItems.length;i++){
                selectItems[i].addEventListener("change", updateData);
            }
        }

        if(e.target.id == "logout"){
            let response = await axios.post(`${url}/user/logout`, {}, options);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            if(response.data.success == true){
                window.location.replace(`${url}/login.html`);
            }else{
                window.location.replace(`${url}/error.html`);
            }
            
        }
        
    } catch (error) {
        console.log(error)
    }
}

let loadData = async (e) => {
    e.preventDefault();
    try {
        //console.log(sessionStorage.getItem('token'));
        if(!sessionStorage.getItem('token')){
            window.location.replace(`${url}/login.html`);
            return;
        }
        if(userDetails.designation == "production-manager"){
            let response = await axios.get(`${url}/user/getByDesignation`);
            // console.log(response);
            let clients = response.data.data;
            document.querySelector(".nav-div").innerHTML = `<div><h2 id="username">Welcome! Manager</h2></div>`
            let text = "";
            for(let i=0;i<clients.length;i++){
                text += ` <div>
                                <button class="client" type="button" id="${clients[i].id}">${clients[i].name}</button>
                            </div>`
            }
            text += `<div class="logout-div">
                        <button id="logout" type="button">Log-Out</button>
                    </div>`;
            document.querySelector(".nav-div").innerHTML  += text;  
            return;
        }
        let response = await axios.post(`${url}/data/get-data`,{}, options);
        if(response.data.success == false){
            swal.fire("Error in Response!")
            return;
        }

        document.querySelector("#username").innerText = `Welcome! ${userDetails.name}`;
        let data = response.data.data;
        document.querySelector("#table").innerHTML = `<div class="table-header"><div class="article-id">Article ID</div><div class="link">Try Here</div><div class="status">Status</div><div class="comments">Comment</div></div>`;
        let text = "";
        for(let i=0;i<data.length;i++){
            let comment = data[i].comment == null ? "" : data[i].comment;
            text += `<div class="table-row"><div class="article-id">${data[i].id}</div><div class="link"><a href="${data[i].link}">${data[i].link}</a></div><div class="status"><select name="Status">${data[i].status == true ? `<option value="yes" selected>Yes</option><option value="no">No</option></select>` : `<option value="yes">Yes</option><option value="no" selected>No</option></select>`}</div><div class="comments">${comment}</div></div>`
        }
        document.querySelector("#table").innerHTML += text;
        let selectItems = document.querySelectorAll("select");
        console.log(selectItems);
        for(let i=0;i<selectItems.length;i++){
            selectItems[i].addEventListener("change", updateData);
        }
        
    } catch (error) {
        console.log(error);
        //swal.fire("Something Went Wrong! Check Console and Reload!");
       // window.location.replace(`${url}/login.html`);
    }
}


document.addEventListener("DOMContentLoaded",loadData);
document.addEventListener("click", getClick)
